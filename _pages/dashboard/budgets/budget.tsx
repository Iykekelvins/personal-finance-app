'use client';

import { useState } from 'react';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { getThemeColor } from '@/lib/utils';
import { Ellipsis } from 'lucide-react';

import BudgetOptions from './budget-options';

export default function Budget({ budget }: { budget: BudgetProps }) {
	const totalSpent = ((budget.spent as number) / budget.maximum) * 100;

	const [openBudgetOptions, setOpenBudgetOptions] = useState(false);

	return (
		<div className='bg-white rounded-150 p-400 space-y-250'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-200'>
					<span
						className='size-4 rounded-full'
						style={{
							backgroundColor: getThemeColor(budget.theme),
						}}
					/>
					<h2 className='text-preset-2 font-bold leading-[1.2]'>
						{budget.category}
					</h2>
				</div>

				<Popover open={openBudgetOptions} onOpenChange={setOpenBudgetOptions}>
					<PopoverTrigger asChild>
						<button>
							<Ellipsis className='text-grey-300' />
						</button>
					</PopoverTrigger>
					<BudgetOptions
						budget={budget}
						setOpenBudgetOptions={setOpenBudgetOptions}
					/>
				</Popover>
			</div>

			<div className='space-y-200'>
				<p className='text-grey-500 text-preset-4 leading-normal'>
					Maximum of ${budget.maximum.toLocaleString()}
				</p>

				<div className='bg-beige-100 h-400 p-50 rounded-50 w-full'>
					<div
						className='h-full rounded-50'
						style={{
							backgroundColor: getThemeColor(budget.theme),
							width: `${totalSpent}%`,
						}}
					/>
				</div>

				<div className='grid grid-cols-2 gap-200'>
					<div className='flex items-center gap-200'>
						<span
							className='w-1 h-10.75 rounded-full'
							style={{
								backgroundColor: getThemeColor(budget.theme),
							}}
						/>
						<div>
							<h3 className='text-preset-5 text-grey-500'>Spent</h3>
							<p className='mt-1 text-preset-4 font-bold'>
								${budget.spent?.toLocaleString()}
							</p>
						</div>
					</div>

					<div className='flex items-center gap-200'>
						<span className='w-1 h-10.75 rounded-full bg-beige-100' />
						<div>
							<h3 className='text-preset-5 text-grey-500'>Remaining</h3>
							<p className='mt-1 text-preset-4 font-bold'>
								${(budget.maximum - budget.spent!).toLocaleString()}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
