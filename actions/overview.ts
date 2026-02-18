'use server';

import { auth } from '@clerk/nextjs/server';
import { UNATHORIZED } from '@/lib/constants';

import connectDB from '@/lib/db';
import Wallet from '@/models/wallets';
import Pot from '@/models/pots';
import Budget from '@/models/budgets';
import Transaction from '@/models/transactions';

export async function getOverview() {
	try {
		const { userId } = await auth();

		if (!userId) return UNATHORIZED;

		await connectDB();

		let wallet = await Wallet.findOne({ userClerkId: userId }).lean();

		if (!wallet) {
			const newWallet = await Wallet.create({
				userClerkId: userId,
				balance: 0,
				expenses: 0,
			});

			wallet = newWallet.toObject();
		}

		// POTS
		const potsToDisplay = await Pot.find({ userClerkId: userId })
			.limit(4)
			.select('name total theme _id')
			.lean();
		const pots = await Pot.find({ userClerkId: userId });
		const totalSavedFromPots = pots.reduce((sum, pot) => {
			return (sum += pot.total);
		}, 0);

		// TRANSACTONS
		const transactions = await Transaction.find({ userClerkId: userId })
			.limit(5)
			.sort('-createdAt')
			.select('-category')
			.lean();

		// BUDGETS
		const budgetsToDisplay = await Budget.find({ userClerkId: userId })
			.limit(4)
			.select('-userClerkId')
			.lean();
		const budgets = await Budget.find({ userClerkId: userId });
		const totalBudgetSpent = budgets.reduce((sum, budget) => {
			return (sum += budget.spent);
		}, 0);
		const overallBudgetLimit = budgets.reduce((sum, budget) => {
			return (sum += budget.maximum);
		}, 0);

		return {
			success: true,
			status: 200,
			data: {
				wallet,
				pots: {
					totalSaved: totalSavedFromPots,
					pot_list: potsToDisplay,
				},
				transactions,
				budgets: {
					totalSpent: totalBudgetSpent,
					totalLimit: overallBudgetLimit,
					budget_list: budgetsToDisplay,
				},
			},
		};
	} catch (error) {
		console.error('Error fetching overview data', error);
		return { success: false, error: 'Failed to fetch overview' };
	}
}
