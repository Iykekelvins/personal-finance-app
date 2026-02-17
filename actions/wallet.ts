'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { UNATHORIZED } from '@/lib/constants';

import connectDB from '@/lib/db';
import Wallet from '@/models/wallets';

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

		await Wallet.findOneAndUpdate(
			{
				userClerkId: userId,
			},
			{
				amount,
			},
		);

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
