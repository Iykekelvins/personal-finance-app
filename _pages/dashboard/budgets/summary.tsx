import { getThemeColor } from '@/lib/utils';

export default function Summary({ budgets }: { budgets: BudgetProps[] }) {
	return (
		<div className='bg-white rounded-150 py-300 px-250 md:p-400'>
			{/* pie chart */}

			<div className='mt-400'>
				<h2 className='text-preset-2 font-bold leading-[1.2]'>Spending Summary</h2>

				<ul className='mt-300 space-y-200'>
					{budgets.map((budget) => (
						<li
							key={budget._id}
							className='flex items-center justify-between
						pb-200 border-b border-b-grey-100 border-solid
						'>
							<div className='flex items-center gap-200'>
								<span
									className='w-1 h-5.25 rounded-full'
									style={{
										backgroundColor: getThemeColor(budget.theme),
									}}
								/>
								<p className='text-preset-4 text-grey-500'>{budget.category}</p>
							</div>

							<div className='flex items-center gap-100'>
								<p className='text-preset-3 font-bold'>
									${budget.spent?.toLocaleString()}
								</p>
								<p className='text-preset-5 text-grey-500'>
									of ${budget.maximum.toLocaleString()}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
