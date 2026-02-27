'use client';

import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart';
import { getThemeColor } from '@/lib/utils';

export default function Summary({ budgets }: { budgets: BudgetProps[] }) {
	const chartData = useMemo(
		() =>
			budgets.map((budget) => ({
				category: budget.category,
				maximum: budget.maximum,
				fill: getThemeColor(budget.theme),
			})),
		[budgets],
	);

	const chartConfig = useMemo(
		() =>
			budgets.reduce(
				(acc, budget) => {
					acc[budget.category] = {
						label: budget.category,
						color: getThemeColor(budget.theme),
					};
					return acc;
				},
				{} as Record<string, { label: string; color: string | undefined }>,
			) satisfies ChartConfig,
		[budgets],
	);

	const totalMaximum = useMemo(
		() => budgets.reduce((sum, budget) => sum + budget.maximum, 0),
		[budgets],
	);

	const totalSpent = useMemo(
		() => budgets.reduce((sum, budget) => sum + budget.spent!, 0),
		[budgets],
	);

	return (
		<div className='bg-white rounded-150 py-300 px-250 md:p-400 h-max des:sticky top-10'>
			{/* pie chart */}
			<div className='flex items-center justify-center'>
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
			</div>
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
