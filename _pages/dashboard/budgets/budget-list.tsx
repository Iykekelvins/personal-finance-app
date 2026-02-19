import { auth } from '@clerk/nextjs/server';

import Budget from '@/models/budgets';
import Transaction from '@/models/transactions';
import BudgetComp from './budget';
import connectDB from '@/lib/db';
import Summary from './summary';

export default async function BudgetList() {
	const { userId } = await auth();

	await connectDB();

	const dbBudgets = await Budget.find({ userClerkId: userId });

	const budgets = await Promise.all(
		dbBudgets.map(async (budget) => {
			const transactions = await Transaction.find({
				category: budget.category,
				userClerkId: userId,
			})
				.select('_id name amount createdAt avatar')
				.limit(3)
				.sort('-createdAt');

			return {
				...JSON.parse(JSON.stringify(budget)),
				transactions: JSON.parse(JSON.stringify(transactions)),
			} as BudgetProps & { transactions: TransactionProps[] };
		}),
	);

	return (
		<div className='mt-400 grid des:grid-cols-2 gap-300'>
			<Summary budgets={budgets} />
			<ul className='space-y-300'>
				{budgets.map((budget) => (
					<BudgetComp key={budget._id} budget={budget} />
				))}
			</ul>
		</div>
	);
}
