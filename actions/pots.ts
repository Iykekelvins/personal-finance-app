'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { UNATHORIZED } from '@/lib/constants';

import connectDB from '@/lib/db';
import Pot from '@/models/pots';
import Wallet from '@/models/wallets';
import Transaction from '@/models/transactions';

export async function createPot(pot: PotProps) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return UNATHORIZED;
		}

		await connectDB();

		const { name, target, theme } = pot;

		if (!name.trim() || !target || !theme) {
			return {
				success: false,
				error: 'Missing name, target or theme',
				status: 400,
			};
		}

		const potExists = await Pot.findOne({
			userClerkId: userId,
			name: name.trim().toLowerCase(),
		});

		if (potExists) {
			return {
				success: false,
				error: 'You already have this pot',
				status: 400,
			};
		}

		await Pot.create({
			userClerkId: userId,
			name: name.trim().toLowerCase(),
			target: Number(target),
			theme,
			total: 0,
		});

		revalidatePath('/pots');

		return {
			success: true,
			status: 201,
		};
	} catch (error) {
		console.error('Error creating pot', error);
		return { success: false, error: 'Failed to create pot' };
	}
}

export async function editPot(pot: PotProps) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return UNATHORIZED;
		}

		await connectDB();

		const { name, target, theme } = pot;

		if (!name.trim() || !target || !theme) {
			return {
				success: false,
				error: 'Missing name, target or theme',
				status: 400,
			};
		}

		const potExists = await Pot.findOne({
			userClerkId: userId,
			name: name.trim().toLowerCase(),
			_id: { $ne: pot._id },
		});

		if (potExists) {
			return {
				success: false,
				error: 'You already have this pot',
				status: 400,
			};
		}

		await Pot.findOneAndUpdate(
			{ _id: pot._id, userClerkId: userId },
			{
				name: name.trim().toLowerCase(),
				target: Number(target),
				theme,
			},
		);

		revalidatePath('/pots');

		return {
			success: true,
			status: 200,
		};
	} catch (error) {
		console.error('Error editing pot', error);
		return { success: false, error: 'Failed to edit pot' };
	}
}

export async function addMoneyToPot({
	_id,
	amount,
}: {
	_id: string;
	amount: number;
}) {
	try {
		const { userId } = await auth();
		const user = await currentUser();

		if (!userId) {
			return UNATHORIZED;
		}

		await connectDB();

		const wallet = await Wallet.findOne({ userClerkId: userId }).lean();

		if (wallet.balance < amount) {
			return {
				success: false,
				status: 400,
				error: 'Your balance is insufficient for this transaction',
			};
		}

		const pot = await Pot.findOne({ _id, userClerkId: userId }).lean();
		const canAdd = pot.total + amount;

		if (canAdd > pot.target) {
			return {
				success: false,
				status: 400,
				error: 'You cannot exceed your target',
			};
		}

		await Pot.findOneAndUpdate(
			{ _id, userClerkId: userId },
			{
				total: (pot.total += amount),
			},
		);

		await Wallet.findOneAndUpdate(
			{ userClerkId: userId },
			{
				balance: (wallet.balance -= amount),
			},
		);

		await Transaction.create({
			userClerkId: userId,
			category: 'Savings',
			name: `${user?.firstName} (You)`,
			avatar: '/companies/logo-1.png',
			amount,
		});

		revalidatePath('/pots');

		return {
			success: true,
			status: 200,
		};
	} catch (error) {
		console.error('Error adding money to pot', error);
		return { success: false, error: 'Failed to add money to pot' };
	}
}

export async function withdrawMoneyFromPot({
	_id,
	amount,
}: {
	_id: string;
	amount: number;
}) {
	try {
		const { userId } = await auth();
		const user = await currentUser();

		if (!userId) {
			return UNATHORIZED;
		}

		await connectDB();

		const wallet = await Wallet.findOne({ userClerkId: userId }).lean();

		const pot = await Pot.findOne({ _id, userClerkId: userId }).lean();

		if (amount > pot.total) {
			return {
				success: false,
				status: 400,
				error: 'You cannot withdraw more than your total',
			};
		}

		await Pot.findOneAndUpdate(
			{ _id, userClerkId: userId },
			{
				total: (pot.total -= amount),
			},
		);

		await Wallet.findOneAndUpdate(
			{ userClerkId: userId },
			{
				balance: (wallet.balance += amount),
			},
		);

		await Transaction.create({
			userClerkId: userId,
			category: 'Savings',
			name: `${user?.firstName} (You)`,
			avatar: '/companies/logo-1.png',
			amount: -amount,
		});

		revalidatePath('/pots');

		return {
			success: true,
			status: 200,
		};
	} catch (error) {
		console.error('Error withdrawing money from pot', error);
		return { success: false, error: 'Failed to withdraw money from pot' };
	}
}

export async function deletePot(id: string) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return UNATHORIZED;
		}

		await connectDB();

		const potToDelete = await Pot.findOneAndDelete({
			_id: id,
			userClerkId: userId,
		});

		if (!potToDelete) {
			return {
				success: false,
				error: 'Pot may have already been deleted',
				status: 404,
			};
		}

		const wallet = await Wallet.findOne({ userClerkId: userId }).lean();

		await Wallet.findOneAndUpdate(
			{ userClerkId: userId },
			{
				balance: (wallet.balance += potToDelete.total),
			},
		);

		revalidatePath('/pots');

		return {
			success: true,
			status: 200,
		};
	} catch (error) {
		console.error('Error deleting pot', error);
		return { success: false, error: 'Failed to delete pot' };
	}
}
