'use client';

import { useEffect, useState, useTransition, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { SORT_OPTIONS } from '@/lib/constants';
import { EllipsisIcon, SearchIcon } from 'lucide-react';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatAmount, getBillStatus } from '@/lib/utils';

import Image from 'next/image';
import BillOptions from './bill-options';

export default function Table({
	bills,
	currentSort,
	currentSearch,
}: {
	bills: BillProps[];
	currentSort: string;
	currentSearch: string;
}) {
	const searchParams = useSearchParams();
	const router = useRouter();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isPending, startTransition] = useTransition();

	const [searchValue, setSearchValue] = useState(currentSearch ?? '');
	const [sortValue, setSortValue] = useState(currentSort ?? 'latest');

	const updateURL = useCallback(
		(newSearch?: string, newSort?: string) => {
			const params = new URLSearchParams(searchParams);

			if (newSearch) {
				params.set('search', newSearch);
			} else {
				params.delete('search');
			}

			if (newSort) {
				params.set('sort', newSort);
			} else {
				params.delete('sort');
			}

			startTransition(() => {
				router.push(`/recurring-bills?${params.toString()}`, { scroll: false });
			});
		},
		[searchParams, router],
	);

	const handleSortChange = (sort: string) => {
		setSortValue(sort);
		updateURL(searchValue.trim() || undefined, sort);
	};

	useEffect(() => {
		const delayedSearch = setTimeout(() => {
			if (searchValue.trim() !== (currentSearch || '')) {
				updateURL(searchValue.trim() || undefined, sortValue);
			}
		}, 150);
		return () => clearTimeout(delayedSearch);
	}, [searchValue, sortValue, currentSearch, updateURL]);

	return (
		<div className='p-400 bg-white rounded-150 w-full'>
			<div className='flex items-center justify-between'>
				<Input
					className='lg:w-[20rem]'
					placeholder='Search bills'
					id='search'
					name='search'
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					icon={<SearchIcon className='size-4' />}
				/>
				<div className='flex items-center gap-2'>
					<p className='text-grey-500 text-preset-4 hidden md:block whitespace-nowrap'>
						Sort by
					</p>
					<Select value={sortValue} onValueChange={handleSortChange}>
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
					<Select value={sortValue} onValueChange={handleSortChange}>
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
			</div>

			<div className='w-full mt-300 overflow-x-auto hidden md:block'>
				<table className='w-full border-collapse'>
					<thead>
						<tr>
							<th
								className='text-grey-500 text-preset-5 py-150 text-left
                border-b border-b-grey-100 border-solid font-normal
                '>
								Bill Title
							</th>
							<th
								className='text-grey-500 text-preset-5 py-150 text-left
                border-b border-b-grey-100 border-solid font-normal
                '>
								Due Date
							</th>
							<th
								className='text-grey-500 text-preset-5 py-150 text-right
                border-b border-b-grey-100 border-solid font-normal
                '>
								Amount
							</th>
							<th className='border-b border-b-grey-100 border-solid'></th>
						</tr>
					</thead>

					<tbody>
						{bills.map((bill, i) => (
							<tr
								key={bill._id}
								className={cn(
									'[&_td]:pt-300 [&_td]:text-preset-5',
									i !== 0 && '[&_td]:pt-200',
									i !== bills.length - 1 &&
										'[&_td]:border-b [&_td]:border-b-grey-100 [&_td]:border-solid [&_td]:pb-200',
								)}>
								<td>
									<div className='flex items-center gap-200'>
										<Image
											src={bill.avatar}
											width={40}
											height={40}
											alt={`Avatar for ${bill.title}`}
										/>
										<p className='text-preset-4 text-grey-900 font-bold'>
											{bill.title}
										</p>
									</div>
								</td>

								<td
									className={cn(
										getBillStatus(bill) === 'paid' && 'text-green',
										getBillStatus(bill) === 'due soon' && 'text-red',
									)}>
									<p className='flex items-center gap-2'>
										<span>Monthly - {bill.dayOfMonth}</span>
										{getBillStatus(bill) === 'paid' && (
											<svg
												width='16'
												height='16'
												viewBox='0 0 16 16'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'>
												<path
													d='M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM10.8538 6.85375L7.35375 10.3538C7.30732 10.4002 7.25217 10.4371 7.19147 10.4623C7.13077 10.4874 7.06571 10.5004 7 10.5004C6.9343 10.5004 6.86923 10.4874 6.80853 10.4623C6.74783 10.4371 6.69269 10.4002 6.64625 10.3538L5.14625 8.85375C5.05243 8.75993 4.99972 8.63268 4.99972 8.5C4.99972 8.36732 5.05243 8.24007 5.14625 8.14625C5.24007 8.05243 5.36732 7.99972 5.5 7.99972C5.63268 7.99972 5.75993 8.05243 5.85375 8.14625L7 9.29313L10.1463 6.14625C10.1927 6.09979 10.2479 6.06294 10.3086 6.0378C10.3693 6.01266 10.4343 5.99972 10.5 5.99972C10.5657 5.99972 10.6308 6.01266 10.6915 6.0378C10.7521 6.06294 10.8073 6.09979 10.8538 6.14625C10.9002 6.1927 10.9371 6.24786 10.9622 6.30855C10.9873 6.36925 11.0003 6.4343 11.0003 6.5C11.0003 6.5657 10.9873 6.63075 10.9622 6.69145C10.9371 6.75214 10.9002 6.8073 10.8538 6.85375Z'
													fill='#277C78'
												/>
											</svg>
										)}
										{getBillStatus(bill) === 'due soon' && (
											<svg
												width='16'
												height='16'
												viewBox='0 0 16 16'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'>
												<path
													d='M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM7.5 5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8.5C8.5 8.63261 8.44732 8.75979 8.35356 8.85355C8.25979 8.94732 8.13261 9 8 9C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5V5ZM8 11.5C7.85167 11.5 7.70666 11.456 7.58333 11.3736C7.45999 11.2912 7.36386 11.1741 7.30709 11.037C7.25033 10.9 7.23548 10.7492 7.26441 10.6037C7.29335 10.4582 7.36478 10.3246 7.46967 10.2197C7.57456 10.1148 7.7082 10.0434 7.85368 10.0144C7.99917 9.98547 8.14997 10.0003 8.28701 10.0571C8.42406 10.1139 8.54119 10.21 8.6236 10.3333C8.70602 10.4567 8.75 10.6017 8.75 10.75C8.75 10.9489 8.67098 11.1397 8.53033 11.2803C8.38968 11.421 8.19892 11.5 8 11.5Z'
													fill='#C94736'
												/>
											</svg>
										)}
									</p>
								</td>
								<td
									className={cn(
										'font-bold text-right',
										getBillStatus(bill) === 'paid' && 'text-green',
										getBillStatus(bill) === 'due soon' && 'text-red',
									)}>
									${formatAmount(bill.amount)}
								</td>
								<td className='text-right'>
									<Popover>
										<PopoverTrigger asChild>
											<button>
												<EllipsisIcon className='text-grey-500' />
											</button>
										</PopoverTrigger>
										<BillOptions bill={bill} />
									</Popover>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<ul className='md:hidden space-y-200 mt-300'>
				{bills.map((bill, i) => (
					<li
						key={bill._id}
						className={cn(
							'flex items-center justify-between',
							i !== bills.length - 1 &&
								'border-b border-b-grey-100 border-solid pb-200',
						)}>
						<div>
							<div className='flex items-center gap-150'>
								<Image
									src={bill.avatar}
									width={32}
									height={32}
									alt={`Avatar for ${bill.title}`}
								/>
								<div>
									<p className='text-preset-4 font-bold'>{bill.title}</p>
								</div>
							</div>
							<p
								className={cn(
									'flex items-center gap-2 mt-1',
									getBillStatus(bill) === 'paid' && 'text-green',
									getBillStatus(bill) === 'due soon' && 'text-red',
								)}>
								<span className='text-preset-5'>Monthly - {bill.dayOfMonth}</span>
								{getBillStatus(bill) === 'paid' && (
									<svg
										width='16'
										height='16'
										viewBox='0 0 16 16'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM10.8538 6.85375L7.35375 10.3538C7.30732 10.4002 7.25217 10.4371 7.19147 10.4623C7.13077 10.4874 7.06571 10.5004 7 10.5004C6.9343 10.5004 6.86923 10.4874 6.80853 10.4623C6.74783 10.4371 6.69269 10.4002 6.64625 10.3538L5.14625 8.85375C5.05243 8.75993 4.99972 8.63268 4.99972 8.5C4.99972 8.36732 5.05243 8.24007 5.14625 8.14625C5.24007 8.05243 5.36732 7.99972 5.5 7.99972C5.63268 7.99972 5.75993 8.05243 5.85375 8.14625L7 9.29313L10.1463 6.14625C10.1927 6.09979 10.2479 6.06294 10.3086 6.0378C10.3693 6.01266 10.4343 5.99972 10.5 5.99972C10.5657 5.99972 10.6308 6.01266 10.6915 6.0378C10.7521 6.06294 10.8073 6.09979 10.8538 6.14625C10.9002 6.1927 10.9371 6.24786 10.9622 6.30855C10.9873 6.36925 11.0003 6.4343 11.0003 6.5C11.0003 6.5657 10.9873 6.63075 10.9622 6.69145C10.9371 6.75214 10.9002 6.8073 10.8538 6.85375Z'
											fill='#277C78'
										/>
									</svg>
								)}
								{getBillStatus(bill) === 'due soon' && (
									<svg
										width='16'
										height='16'
										viewBox='0 0 16 16'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM7.5 5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8.5C8.5 8.63261 8.44732 8.75979 8.35356 8.85355C8.25979 8.94732 8.13261 9 8 9C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5V5ZM8 11.5C7.85167 11.5 7.70666 11.456 7.58333 11.3736C7.45999 11.2912 7.36386 11.1741 7.30709 11.037C7.25033 10.9 7.23548 10.7492 7.26441 10.6037C7.29335 10.4582 7.36478 10.3246 7.46967 10.2197C7.57456 10.1148 7.7082 10.0434 7.85368 10.0144C7.99917 9.98547 8.14997 10.0003 8.28701 10.0571C8.42406 10.1139 8.54119 10.21 8.6236 10.3333C8.70602 10.4567 8.75 10.6017 8.75 10.75C8.75 10.9489 8.67098 11.1397 8.53033 11.2803C8.38968 11.421 8.19892 11.5 8 11.5Z'
											fill='#C94736'
										/>
									</svg>
								)}
							</p>
						</div>
						<div className='flex items-center gap-200'>
							<p
								className={cn(
									'font-bold text-right',
									getBillStatus(bill) === 'paid' && 'text-green',
									getBillStatus(bill) === 'due soon' && 'text-red',
								)}>
								${formatAmount(bill.amount)}
							</p>
							<Popover>
								<PopoverTrigger asChild>
									<button>
										<EllipsisIcon className='text-grey-500' />
									</button>
								</PopoverTrigger>
								<BillOptions bill={bill} />
							</Popover>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
