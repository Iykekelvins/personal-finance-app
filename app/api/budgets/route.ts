import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import connectDB from '@/lib/db';
import Budget from '@/models/budgets';

export async function POST(request: NextRequest) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		const { category, maximum, theme } = await request.json();

		if (!category.trim() || !maximum || !theme) {
			return NextResponse.json(
				{ message: 'Missing category, maximum amount or theme' },
				{ status: 400 },
			);
		}

		await connectDB();

		const newBudget = await Budget.create({
			userClerkId: userId,
			category,
			maximum: Number(maximum),
			theme,
		});

		return NextResponse.json(
			{
				budget: newBudget.toObject(),
				message: 'Budget created successfully',
			},
			{
				status: 201,
			},
		);
	} catch (error) {
		console.log('Error creating budget', error);

		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
