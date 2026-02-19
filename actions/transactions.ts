'use server';

import { UNATHORIZED } from '@/lib/constants';
import { auth } from '@clerk/nextjs/server';

import connectDB from '@/lib/db';
import Transaction from '@/models/transactions';

type SortOption = 'latest' | 'oldest' | 'a_to_z' | 'z_to_a' | 'highest' | 'lowest';

interface GetTransactionsParams {
	sort?: SortOption;
	category?: string;
	search?: string;
	page?: number;
}

async function getTransactions({
	sort,
	category,
	search,
	page = 1,
}: GetTransactionsParams) {
	const sortOptions: Record<SortOption, Record<string, 1 | -1>> = {
		latest: { createdAt: -1 },
		oldest: { createdAt: 1 },
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

		if (category) match.category = category;
		if (search) match.name = { $regex: search, $options: 'i' };

		const LIMIT = 10;
		const sortKey: SortOption = sort && sort in sortOptions ? sort : 'latest';

		const [transactions, total] = await Promise.all([
			Transaction.aggregate([
				{ $match: match },
				{ $sort: sortOptions[sortKey] },
				{ $skip: (page - 1) * LIMIT },
				{ $limit: LIMIT },
			]),
			Transaction.countDocuments(match),
		]);

		const totalPages = Math.ceil(total / LIMIT);

		return {
			transactions: transactions.map((t) => ({
				...t,
				_id: t._id.toString(),
			})),
			pagination: {
				total,
				page,
				limit: LIMIT,
				totalPages,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1,
			},
		};
	} catch (error) {
		console.error('[getTransactions]', error);
		throw new Error('Failed to fetch transactions');
	}
}

export default getTransactions;
