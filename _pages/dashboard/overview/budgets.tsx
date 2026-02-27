'use client';

import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart';
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
	const chartData = useMemo(
		() =>
			budgets.budget_list.map((budget) => ({
				category: budget.category,
				maximum: budget.maximum,
				fill: getThemeColor(budget.theme),
			})),
		[budgets.budget_list],
	);

	const chartConfig = useMemo(
		() =>
			budgets.budget_list.reduce(
				(acc, budget) => {
					acc[budget.category] = {
						label: budget.category,
						color: getThemeColor(budget.theme),
					};
					return acc;
				},
				{} as Record<string, { label: string; color: string | undefined }>,
			) satisfies ChartConfig,
		[budgets.budget_list],
	);

	const totalMaximum = useMemo(
		() => budgets.budget_list.reduce((sum, budget) => sum + budget.maximum, 0),
		[budgets.budget_list],
	);

	const totalSpent = useMemo(
		() => budgets.budget_list.reduce((sum, budget) => sum + budget.spent!, 0),
		[budgets.budget_list],
	);

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
				<div className='flex flex-col sm:flex-row items-center justify-between mt-250'>
					{/* pie chart here */}
					<ChartContainer config={chartConfig} className='aspect-square size-75'>
						<PieChart>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel className='bg-white' />}
							/>
							<Pie
								data={chartData}
								dataKey='maximum'
								nameKey='category'
								innerRadius={80}
								strokeWidth={5}>
								<Label
									content={({ viewBox }) => {
										if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
											return (
												<text
													x={viewBox.cx}
													y={viewBox.cy}
													textAnchor='middle'
													dominantBaseline='middle'>
													<tspan
														x={viewBox.cx}
														y={viewBox.cy}
														className='fill-grey-900 font-bold text-preset-1'>
														${totalSpent.toLocaleString()}
													</tspan>
													<tspan
														x={viewBox.cx}
														y={(viewBox.cy || 0) + 24}
														className='fill-grey-500 text-preset-5 relative top-2'>
														of ${totalMaximum.toLocaleString()} limit
													</tspan>
												</text>
											);
										}
									}}
								/>
							</Pie>
						</PieChart>
					</ChartContainer>
					<ul className='gap-200 grid grid-cols-2 des:grid-cols-1'>
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
