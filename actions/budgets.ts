'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { UNATHORIZED } from '@/lib/constants';

import connectDB from '@/lib/db';
import Budget from '@/models/budgets';

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
