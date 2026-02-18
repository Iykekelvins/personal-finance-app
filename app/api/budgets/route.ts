import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import Budget from '@/models/budgets';

export async function GET() {
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json(
			{
				error: 'Unauthorized',
			},
			{ status: 403 },
		);
	}

	const userBudgetCategories = await Budget.find({
		userClerkId: userId,
	}).select('category');

	return NextResponse.json({
		categories: userBudgetCategories,
	});
}
