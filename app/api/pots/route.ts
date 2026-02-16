import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import connectDB from '@/lib/db';
import Pot from '@/models/pots';

export async function POST(request: NextRequest) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		const { name, target, theme } = await request.json();

		if (!name.trim() || !target || !theme) {
			return NextResponse.json(
				{ message: 'Missing name, target or theme' },
				{ status: 400 },
			);
		}

		await connectDB();

		const newPot = await Pot.create({
			userClerkId: userId,
			name,
			target: Number(target),
			theme,
			total: 0,
		});

		return NextResponse.json(
			{
				pot: newPot.toObject(),
				message: 'Pot created successfully',
			},
			{
				status: 201,
			},
		);
	} catch (error) {
		console.log('Error creating pot', error);

		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
