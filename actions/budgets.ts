'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { UNATHORIZED } from '@/lib/constants';

import connectDB from '@/lib/db';
import Budget from '@/models/budgets';
import Wallet from '@/models/wallets';
import Transaction from '@/models/transactions';

export async function createBudget(budget: BudgetProps) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return UNATHORIZED;
		}

		await connectDB();

		const { category, maximum, theme } = budget;

		if (!category || !maximum || !theme) {
			return {
				success: false,
				error: 'Missing category, maximum spend or theme',
				status: 400,
			};
		}

		const budgetExists = await Budget.findOne({
			userClerkId: userId,
			category,
		});

		if (budgetExists) {
			return {
				success: false,
				error: 'You already have this budget',
				status: 400,
			};
		}

		await Budget.create({
			userClerkId: userId,
			category,
			maximum: Number(maximum),
			theme,
			spent: 0,
		});

		revalidatePath('/budgets');

		return {
			success: true,
			status: 201,
		};
	} catch (error) {
		console.error('Error creating budget', error);
		return { success: false, error: 'Failed to create budget' };
	}
}

export async function editBudget(budget: BudgetProps) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return UNATHORIZED;
		}

		await connectDB();

		const { category, maximum, theme } = budget;

		if (!category || !maximum || !theme) {
			return {
				success: false,
				error: 'Missing category, maximum spend or theme',
				status: 400,
			};
		}

		const budgetExists = await Budget.findOne({
			userClerkId: userId,
			_id: budget._id,
		});

		if (!budgetExists) {
			return {
				success: false,
				error: "This budget doesn't exist",
				status: 404,
			};
		}

		if (budgetExists.spent > maximum) {
			return {
				success: false,
				error: "Your maximum spend can't be less than your total spend",
				status: 400,
			};
		}

		await Budget.findOneAndUpdate(
			{ _id: budget._id, userClerkId: userId },
			{
				category,
				maximum: Number(maximum),
				theme,
			},
		);

		revalidatePath('/budgets');

		return {
			success: true,
			status: 200,
		};
	} catch (error) {
		console.error('Error editing budget', error);
		return { success: false, error: 'Failed to edit budget' };
	}
}

type SendMoney = {
	id: string;
	name: string;
	amount: number;
	avatar: string;
};

export async function sendMoney({ id, name, amount, avatar }: SendMoney) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return UNATHORIZED;
		}

		await connectDB();

		const wallet = await Wallet.findOne({ userClerkId: userId });

		if (wallet.balance < amount) {
			return {
				success: false,
				error: 'Your balance is insufficient for this transaction',
				status: 400,
			};
		}

		const budget = await Budget.findOne({
			userClerkId: userId,
			_id: id,
		});

		const canSpend = budget.maximum - budget.spent;

		if (amount > canSpend) {
			return {
				success: false,
				error: `You can't spend more than $${canSpend.toLocaleString()}`,
				status: 400,
			};
		}

		await Budget.findOneAndUpdate(
			{
				userClerkId: userId,
				_id: id,
			},
			{
				spent: (budget.spent += amount),
				maximum: (budget.maximum -= amount),
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
			amount: -amount,
			name,
			avatar,
			category: budget.category,
		});

		revalidatePath('/budgets');

		return {
			success: true,
			status: 201,
		};
	} catch (error) {
		console.error('Error sending money', error);
		return { success: false, error: 'Failed to send money' };
	}
}

export async function deleteBudget(id: string) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return UNATHORIZED;
		}

		await connectDB();

		const budgetToDelete = await Budget.findOneAndDelete({
			_id: id,
			userClerkId: userId,
		});

		if (!budgetToDelete) {
			return {
				success: false,
				error: 'Budget may have already been deleted',
				status: 404,
			};
		}

		revalidatePath('/budgets');

		return {
			success: true,
			status: 200,
		};
	} catch (error) {
		console.error('Error deleting budget', error);
		return { success: false, error: 'Failed to delete budget' };
	}
}
