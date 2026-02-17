'use server';

import { auth } from '@clerk/nextjs/server';
import { UNATHORIZED } from '@/lib/constants';

import connectDB from '@/lib/db';
import Wallet from '@/models/wallets';
import Pot from '@/models/pots';

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

		const potsToDisplay = await Pot.find({ userClerkId: userId })
			.limit(4)
			.select('name total theme _id')
			.lean();
		const pots = await Pot.find({ userClerkId: userId });
		const totalSavedFromPots = pots.reduce((sum, acc) => {
			return (sum += acc.total);
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
			},
		};
	} catch (error) {
		console.error('Error fetching overview data', error);
		return { success: false, error: 'Failed to fetch overview' };
	}
}
