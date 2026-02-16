'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import connectDB from '@/lib/db';
import Pot from '@/models/pots';

const UNATHORIZED = {
	success: false,
	error: 'Unauthorized',
	status: 401,
};

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
			status: 201,
		};
	} catch (error) {
		console.error('Error editing pot', error);
		return { success: false, error: 'Failed to edit pot' };
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
