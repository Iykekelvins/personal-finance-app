import { auth } from '@clerk/nextjs/server';

import Budget from '@/models/budgets';
import BudgetComp from './budget';
import connectDB from '@/lib/db';
import Summary from './summary';

export default async function BudgetList() {
	const { userId } = await auth();

	await connectDB();

	const dbBudgets = await Budget.find({ userClerkId: userId });

	const budgets = dbBudgets.map((budget) => {
		// const transactions = await Transaction.find({category: budget.category})

		return {
			...JSON.parse(JSON.stringify(budget)),
			transactions: [],
		};
	}) as BudgetProps[];

	return (
		<div className='mt-400 grid des:grid-cols-2 gap-300'>
			<Summary />
			<ul className='space-y-300'>
				{budgets.map((budget) => (
					<BudgetComp key={budget._id} budget={budget} />
				))}
			</ul>
		</div>
	);
}
