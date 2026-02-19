'use client';

import { useState } from 'react';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatAmount, formatDate, getThemeColor } from '@/lib/utils';
import { Ellipsis } from 'lucide-react';

import BudgetOptions from './budget-options';
import SeeDetails from '@/components/see-details';
import Image from 'next/image';

export default function Budget({
	budget,
}: {
	budget: BudgetProps & { transactions: TransactionProps[] };
}) {
	const totalSpent = ((budget.spent as number) / budget.maximum) * 100;

	const [openBudgetOptions, setOpenBudgetOptions] = useState(false);

	return (
		<div className='bg-white rounded-150 py-300 px-250 md:p-400 space-y-250'>
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

				{budget.transactions.length > 0 && (
					<div className='bg-beige-100 rounded-150 p-200 md:p-250 mt-250'>
						<div className='flex items-center justify-between'>
							<h3 className='text-preset-3 font-bold'>Latest Spending</h3>
							<SeeDetails
								href={`/transactions?category=${budget.category}`}
								text='All'
							/>
						</div>

						<ul className='mt-250 space-y-150'>
							{budget.transactions.map((t, i) => (
								<li
									key={t._id}
									className={cn(
										'flex items-center justify-between pb-150',
										i !== budget.transactions.length - 1 &&
											'border-b border-b-grey-500 border-solid',
									)}>
									<div className='flex items-center gap-200'>
										<Image
											src={t.avatar}
											width={32}
											height={32}
											alt={`Avatar for ${t.name}`}
											className='hidden md:block'
										/>
										<p className='text-preset-5 font-bold'>{t.name}</p>
									</div>
									<div className='text-right'>
										<p className='text-preset-5 font-bold leading-normal'>
											-${formatAmount(Number(t.amount.toString().slice(1)))}
										</p>
										<p className='text-preset-5 text-grey-500 mt-1'>
											{formatDate(t.createdAt)}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
