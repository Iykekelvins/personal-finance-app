'use client';

import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/constants';
import { cn, formatAmount, formatDate } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';

import Image from 'next/image';
import { useState } from 'react';

export default function Table({
	transactions,
}: {
	transactions: TransactionProps[];
}) {
	const [sortValue, setSortValue] = useState('latest');
	const [categoryValue, setCategoryValue] = useState('all');

	return (
		<div>
			<div className='flex items-center justify-between'>
				<Input
					className='lg:w-[20rem]'
					placeholder='Search transaction'
					icon={<SearchIcon className='size-4' />}
				/>

				<div className='flex items-center gap-300'>
					<div className='flex items-center gap-2'>
						<p className='text-grey-500 text-preset-4 hidden md:block whitespace-nowrap'>
							Sort by
						</p>
						<Select value={sortValue} onValueChange={setSortValue}>
							<SelectTrigger className='border-grey-500! hidden md:flex'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{SORT_OPTIONS.map((option) => (
									<SelectItem key={option.name} value={option.value}>
										{option.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={sortValue} onValueChange={setSortValue}>
							<SelectTrigger className='md:hidden border-0 p-0 [&_.claret]:hidden'>
								<svg
									width='20'
									height='20'
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M16.25 2.5L3.75 2.5C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75L2.5 16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM5.625 5.625L13.125 5.625C13.2908 5.625 13.4497 5.69085 13.5669 5.80806C13.6842 5.92527 13.75 6.08424 13.75 6.25C13.75 6.41576 13.6842 6.57473 13.5669 6.69194C13.4497 6.80915 13.2908 6.875 13.125 6.875L5.625 6.875C5.45924 6.875 5.30027 6.80915 5.18306 6.69194C5.06585 6.57473 5 6.41576 5 6.25C5 6.08424 5.06585 5.92527 5.18306 5.80806C5.30027 5.69085 5.45924 5.625 5.625 5.625ZM8.75 14.375L5.625 14.375C5.45924 14.375 5.30027 14.3092 5.18306 14.1919C5.06585 14.0747 5 13.9158 5 13.75C5 13.5842 5.06585 13.4253 5.18306 13.3081C5.30027 13.1908 5.45924 13.125 5.625 13.125L8.75 13.125C8.91576 13.125 9.07473 13.1908 9.19194 13.3081C9.30915 13.4253 9.375 13.5842 9.375 13.75C9.375 13.9158 9.30915 14.0747 9.19194 14.1919C9.07473 14.3092 8.91576 14.375 8.75 14.375ZM9.375 10.625L5.625 10.625C5.45924 10.625 5.30027 10.5592 5.18306 10.4419C5.06585 10.3247 5 10.1658 5 10C5 9.83424 5.06585 9.67527 5.18306 9.55806C5.30027 9.44085 5.45924 9.375 5.625 9.375H9.375C9.54076 9.375 9.69973 9.44085 9.81694 9.55806C9.93415 9.67527 10 9.83424 10 10C10 10.1658 9.93415 10.3247 9.81694 10.4419C9.69973 10.5592 9.54076 10.625 9.375 10.625ZM15.4422 12.9422L13.5672 14.8172C13.5091 14.8753 13.4402 14.9214 13.3643 14.9529C13.2885 14.9843 13.2071 15.0005 13.125 15.0005C13.0429 15.0005 12.9615 14.9843 12.8857 14.9529C12.8098 14.9214 12.7409 14.8753 12.6828 14.8172L10.8078 12.9422C10.6905 12.8249 10.6247 12.6659 10.6247 12.5C10.6247 12.3341 10.6905 12.1751 10.8078 12.0578C10.9251 11.9405 11.0841 11.8747 11.25 11.8747C11.4159 11.8747 11.5749 11.9405 11.6922 12.0578L12.5 12.8664V9.375C12.5 9.20924 12.5658 9.05027 12.6831 8.93306C12.8003 8.81585 12.9592 8.75 13.125 8.75C13.2908 8.75 13.4497 8.81585 13.5669 8.93306C13.6842 9.05027 13.75 9.20924 13.75 9.375V12.8664L14.5578 12.0578C14.6751 11.9405 14.8341 11.8747 15 11.8747C15.1659 11.8747 15.3249 11.9405 15.4422 12.0578C15.5595 12.1751 15.6253 12.3341 15.6253 12.5C15.6253 12.6659 15.5595 12.8249 15.4422 12.9422Z'
										fill='#201F24'
									/>
								</svg>
							</SelectTrigger>
							<SelectContent>
								{SORT_OPTIONS.map((option) => (
									<SelectItem key={option.name} value={option.value}>
										{option.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='flex items-center gap-2'>
						<p className='text-grey-500 text-preset-4 hidden md:block'>Category</p>
						<Select value={categoryValue} onValueChange={setCategoryValue}>
							<SelectTrigger className='border-grey-500! hidden md:flex'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Transactions</SelectItem>
								{CATEGORIES.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={categoryValue} onValueChange={setCategoryValue}>
							<SelectTrigger className='border-grey-500! border-0 p-0 md:hidden [&_.claret]:hidden'>
								<svg
									width='20'
									height='20'
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M17.7976 5.21563L17.7914 5.22266L12.5 10.8727V15.2078C12.5003 15.414 12.4496 15.617 12.3524 15.7989C12.2552 15.9807 12.1145 16.1357 11.9429 16.25L9.44295 17.9172C9.25455 18.0427 9.03561 18.1147 8.80951 18.1254C8.5834 18.1362 8.3586 18.0854 8.15912 17.9784C7.95964 17.8714 7.79296 17.7122 7.67687 17.5179C7.56078 17.3236 7.49964 17.1014 7.49998 16.875L7.49998 10.8727L2.20857 5.22266L2.20232 5.21563C2.03963 5.03657 1.93238 4.81416 1.8936 4.57536C1.85483 4.33656 1.88618 4.09163 1.98386 3.8703C2.08154 3.64897 2.24135 3.46074 2.44391 3.32844C2.64646 3.19615 2.88305 3.12548 3.12498 3.125L16.875 3.125C17.1171 3.12502 17.354 3.19537 17.5569 3.32749C17.7598 3.4596 17.92 3.64781 18.018 3.86923C18.1159 4.09065 18.1475 4.33576 18.1088 4.57478C18.0701 4.81379 17.9628 5.03643 17.8 5.21563H17.7976Z'
										fill='#201F24'
									/>
								</svg>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Transactions</SelectItem>
								{CATEGORIES.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			<div className='w-full mt-300 overflow-x-auto hidden md:block'>
				<table className='w-full border-collapse'>
					<thead>
						<tr>
							<th
								className='text-grey-500 text-preset-5 px-200 py-150 text-left
                border-b border-b-grey-100 border-solid font-normal
                '>
								Recipient / Sender
							</th>
							<th
								className='text-grey-500 text-preset-5 py-150 text-left
                border-b border-b-grey-100 border-solid font-normal
                '>
								Category
							</th>
							<th
								className='text-grey-500 text-preset-5 py-150 text-left
                border-b border-b-grey-100 border-solid font-normal
                '>
								Transaction Date
							</th>
							<th
								className='text-grey-500 text-preset-5 py-150 text-right
                border-b border-b-grey-100 border-solid font-normal pr-200
                '>
								Amount
							</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction, i) => (
							<tr
								key={transaction._id}
								className={cn(
									'[&_td]:pb-200 [&_td]:pt-300 [&_td]:text-preset-5',
									i !== 0 && '[&_td]:pt-200',
									i !== transactions.length - 1 &&
										'[&_td]:border-b [&_td]:border-b-grey-100 [&_td]:border-solid',
								)}>
								<td className='pl-200'>
									<div className='flex items-center gap-200'>
										<Image
											src={transaction.avatar}
											width={40}
											height={40}
											alt={`Avatar for ${transaction.name}`}
										/>
										<p className='text-preset-4 text-grey-900 font-bold'>
											{transaction.name}
										</p>
									</div>
								</td>
								<td className='text-grey-500'>{transaction.category}</td>
								<td className='text-grey-500'>
									{formatDate(transaction.createdAt)}
								</td>
								<td
									className={cn(
										'font-bold text-right',
										transaction.amount > 0 ? 'text-green' : '',
									)}>
									{transaction.amount > 0 ? '+' : '-'}$
									{formatAmount(
										transaction.amount < 0
											? Number(transaction.amount.toLocaleString().slice(1))
											: transaction.amount,
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<ul className='md:hidden space-y-200 mt-300'>
				{transactions.map((transaction, i) => (
					<li
						key={transaction._id}
						className={cn(
							'flex items-center justify-between',
							'pb-200',
							i !== transactions.length - 1 &&
								'border-b border-b-grey-100 border-solid',
						)}>
						<div className='flex items-center gap-150'>
							<Image
								src={transaction.avatar}
								width={32}
								height={32}
								alt={`Avatar for ${transaction.name}`}
							/>
							<div>
								<p className='text-preset-4 font-bold'>{transaction.name}</p>
								<p className='text-grey-500 text-preset-5 mt-1'>
									{transaction.category}
								</p>
							</div>
						</div>

						<div className='text-right'>
							<p
								className={cn(
									'font-bold text-right text-preset-4',
									transaction.amount > 0 ? 'text-green' : '',
								)}>
								{transaction.amount > 0 ? '+' : '-'}$
								{formatAmount(
									transaction.amount < 0
										? Number(transaction.amount.toLocaleString().slice(1))
										: transaction.amount,
								)}
							</p>
							<p className='text-grey-500 text-preset-5 mt-1'>
								{formatDate(transaction.createdAt)}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
