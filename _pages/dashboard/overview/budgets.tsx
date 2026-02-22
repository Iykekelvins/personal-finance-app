import { capitalizeWords, getThemeColor } from '@/lib/utils';

import SeeDetails from '@/components/see-details';

export default function Budgets({
	budgets,
}: {
	budgets: {
		totalSpent: number;
		totalLimit: number;
		budget_list: BudgetProps[];
	};
}) {
	return (
		<div className='bg-white rounded-150 py-300 px-250 sm:p-400'>
			<div className='flex items-center justify-between'>
				<h2 className='text-preset-2 font-bold'>Budgets</h2>
				<SeeDetails href='/budgets' />
			</div>

			{budgets.budget_list.length === 0 ? (
				<p className='text-preset-3 text-center py-250'>
					You don&apos;t have any budgets
				</p>
			) : (
				<div className='flex items-center mt-250'>
					{/* pie chart here */}
					<div></div>
					<ul className='space-y-200'>
						{budgets.budget_list.map((budget) => (
							<li key={budget._id} className='flex items-center gap-200'>
								<span
									className='w-1 h-10.75 rounded-full'
									style={{
										backgroundColor: getThemeColor(budget.theme),
									}}
								/>
								<div className='space-y-1'>
									<h3 className='text-preset-5 text-grey-500'>
										{capitalizeWords(budget.category)}
									</h3>
									<p className='text-preset-4 font-bold'>
										${budget.maximum.toLocaleString()}.
										{budget.maximum.toFixed(2).slice(-2)}
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
