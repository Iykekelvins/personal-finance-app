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

	if (budgets.length === 0) {
		return (
			<div
				className='flex flex-col items-center justify-center 
				flex-1 gap-200'>
				<svg
					width='120'
					height='120'
					viewBox='0 0 120 120'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<circle
						cx='60'
						cy='60'
						r='58'
						fill='#F8F4F0'
						stroke='#E5E5E5'
						strokeWidth='2'
					/>

					<circle
						cx='60'
						cy='60'
						r='25'
						fill='white'
						stroke='#D1D1D1'
						strokeWidth='2'
					/>

					<path
						d='M 60 60 L 60 35 A 25 25 0 0 1 78.66 48.66 Z'
						fill='#C94736'
						opacity='0.8'
					/>

					<path
						d='M 60 60 L 78.66 48.66 A 25 25 0 0 1 78.66 71.34 Z'
						fill='#E5E5E5'
					/>

					<path d='M 60 60 L 78.66 71.34 A 25 25 0 0 1 60 85 Z' fill='#D1D1D1' />

					<text
						x='60'
						y='67'
						textAnchor='middle'
						fontFamily='Arial, sans-serif'
						fontSize='20'
						fontWeight='bold'
						fill='#C94736'>
						$
					</text>

					<circle cx='85' cy='35' r='3' fill='#C94736' />
					<circle cx='35' cy='85' r='3' fill='#C94736' opacity='0.5' />
				</svg>
				<p className='text-preset-2 font-bold text-center'>
					You don&apos;t have any budgets
				</p>
			</div>
		);
	}

	return (
		<div className='grid des:grid-cols-2 gap-300'>
			<Summary budgets={budgets} />
			<ul className='space-y-300'>
				{budgets.map((budget) => (
					<BudgetComp key={budget._id} budget={budget} />
				))}
			</ul>
		</div>
	);
}
