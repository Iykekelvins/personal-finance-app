'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { UNATHORIZED } from '@/lib/constants';

import connectDB from '@/lib/db';
import Wallet from '@/models/wallets';
import Transaction from '@/models/transactions';

export async function topUpWallet(amount: number) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return UNATHORIZED;
		}

		await connectDB();

		if (!amount) {
			return {
				success: false,
				error: 'Amount is required',
				status: 400,
			};
		}

		const wallet = await Wallet.findOne({
			userClerkId: userId,
		});

		if (!wallet) {
			return {
				success: false,
				error: 'Wallet not found',
				status: 401,
			};
		}

		const DAILY_LIMIT = 10000;

		const todayTotal = await getTodayTotal(userId);

		if (todayTotal + amount > DAILY_LIMIT) {
			const remaining = DAILY_LIMIT - todayTotal;

			return {
				success: false,
				error: `Daily limit exceeded. You can only top up $${remaining.toLocaleString()} more today.`,
				status: 400,
			};
		}

		await Wallet.findOneAndUpdate(
			{
				userClerkId: userId,
			},
			{
				balance: (wallet.balance += amount),
			},
		);

		await Transaction.create({
			name: 'Wallet Top-up',
			amount,
			category: 'Top Up',
			userClerkId: userId,
			avatar: '/companies/logo-15.png',
		});

		revalidatePath('/');

		return {
			success: true,
			status: 201,
		};
	} catch (error) {
		console.error('Error topping up wallet', error);
		return { success: false, error: 'Failed to top up wallet' };
	}
}

async function getTodayTotal(userId: string) {
	const startOfDay = new Date();
	startOfDay.setHours(0, 0, 0, 0);

	const result = await Transaction.aggregate([
		{
			$match: {
				userClerkId: userId,
				category: 'Top Up',
				createdAt: { $gte: startOfDay },
			},
		},
		{
			$group: {
				_id: null,
				total: { $sum: '$amount' },
			},
		},
	]);

	return result[0]?.total ?? 0;
}
