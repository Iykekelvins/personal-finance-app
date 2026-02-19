'use server';

import { UNATHORIZED } from '@/lib/constants';
import { auth } from '@clerk/nextjs/server';

import connectDB from '@/lib/db';
import Bill from '@/models/bills';

interface GetBillsParams {
	sort?: SortOption;
	search?: string;
}

export async function getBills({ sort, search }: GetBillsParams) {
	const sortOptions: Record<SortOption, Record<string, 1 | -1>> = {
		latest: { dayOfMonth: -1 },
		oldest: { dayOfMonth: 1 },
		a_to_z: { name: 1 },
		z_to_a: { name: -1 },
		highest: { amount: -1 },
		lowest: { amount: 1 },
	};

	try {
		const { userId } = await auth();

		if (!userId) return UNATHORIZED;

		await connectDB();

		const match: Record<string, unknown> = {
			userClerkId: userId,
		};

		if (search) match.name = { $regex: search, $options: 'i' };
		const sortKey: SortOption = sort && sort in sortOptions ? sort : 'latest';

		const bills = await Bill.aggregate([
			{ $match: match },
			{ $sort: sortOptions[sortKey] },
		]);

		const now = new Date();
		const currentMonth = new Date().getMonth();

		const processedBills = bills.map((bill) => {
			const dueDate = new Date(now.getFullYear(), now.getMonth(), bill.dayOfMonth);
			const daysUntilDue = Math.ceil(
				(dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
			);
			const paidMonth = new Date(bill.updatedAt).getMonth();

			// reset if new month
			if (bill.status === 'paid' && paidMonth !== currentMonth) {
				bill.status = 'pending';
			}

			return {
				...bill,
				_id: bill._id.toString(),
				daysUntilDue,
				isDueSoon: daysUntilDue <= 3 && daysUntilDue >= 0 && bill.status !== 'paid',
			};
		});

		const bill_summary = {
			paid: {
				total: processedBills.filter((b) => b.status === 'paid').length,
				amount: processedBills
					.filter((b) => b.status === 'paid')
					.reduce((acc, b) => acc + b.amount, 0),
			},
			upcoming: {
				total: processedBills.filter((b) => b.status !== 'paid' && !b.isDueSoon)
					.length,
				amount: processedBills
					.filter((b) => b.status !== 'paid' && !b.isDueSoon)
					.reduce((acc, b) => acc + b.amount, 0),
			},
			due: {
				total: processedBills.filter((b) => b.isDueSoon).length,
				amount: processedBills
					.filter((b) => b.isDueSoon)
					.reduce((acc, b) => acc + b.amount, 0),
			},
		};

		return {
			bills: processedBills,
			total_bills: processedBills.reduce((acc, b) => acc + b.amount, 0),
			bill_summary,
		};
	} catch (error) {
		console.error('[getBills]', error);
		throw new Error('Failed to fetch bills');
	}
}
