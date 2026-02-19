'use client';

import { Button } from '@/components/ui/button';

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({
	totalPages,
	currentPage,
	onPageChange,
}: PaginationProps) {
	const getVisiblePages = () => {
		const pages: (number | string)[] = [];

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			let startPage = Math.max(1, currentPage - 1);

			startPage = Math.min(startPage, totalPages - 5);

			for (let i = startPage; i < startPage + 3; i++) {
				pages.push(i);
			}

			pages.push('...');

			for (let i = totalPages - 2; i <= totalPages; i++) {
				pages.push(i);
			}
		}

		return pages;
	};

	return (
		<div className='flex items-center justify-between mt-300 relative'>
			<Button
				variant={'outline'}
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='h-10'>
				<svg
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M10.1465 12.8535L5.14649 7.85353C5.10001 7.8071 5.06313 7.75195 5.03796 7.69125C5.0128 7.63056 4.99985 7.56549 4.99985 7.49978C4.99985 7.43408 5.0128 7.36901 5.03796 7.30831C5.06313 7.24762 5.10001 7.19247 5.14649 7.14603L10.1465 2.14603C10.2164 2.07603 10.3055 2.02834 10.4026 2.00902C10.4996 1.98969 10.6002 1.9996 10.6916 2.03747C10.7831 2.07535 10.8612 2.1395 10.9161 2.22179C10.971 2.30409 11.0003 2.40084 11.0002 2.49978L11.0002 12.4998C11.0003 12.5987 10.971 12.6955 10.9161 12.7778C10.8612 12.8601 10.7831 12.9242 10.6916 12.9621C10.6002 13 10.4996 13.0099 10.4026 12.9905C10.3055 12.9712 10.2164 12.9235 10.1465 12.8535Z'
						fill='#696868'
					/>
				</svg>

				<span className='hidden md:block'>Prev</span>
			</Button>

			<ul className='flex items-center gap-100 justify-between'>
				{getVisiblePages().map((page, index) => (
					<li key={index}>
						<button
							onClick={() => typeof page === 'number' && onPageChange(page)}
							disabled={page === '...'}
							className={`size-10 rounded-100 text-14 font-medium 
							border border-solid border-beige-500
							${
								page === currentPage
									? 'text-white bg-grey-900 border-gray-900 hover:bg-gray-900'
									: page === '...'
										? 'text-gray-500'
										: 'hover:bg-beige-100'
							}`}>
							{page}
						</button>
					</li>
				))}
			</ul>

			<Button
				className='h-10'
				variant={'outline'}
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}>
				<span className='hidden md:block'>Next</span>
				<svg
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M5.85351 3.14647L10.8535 8.14647C10.9 8.1929 10.9369 8.24805 10.962 8.30875C10.9872 8.36944 11.0001 8.43451 11.0001 8.50022C11.0001 8.56592 10.9872 8.63099 10.962 8.69169C10.9369 8.75238 10.9 8.80753 10.8535 8.85397L5.85351 13.854C5.78358 13.924 5.69445 13.9717 5.59741 13.991C5.50037 14.0103 5.39977 14.0004 5.30836 13.9625C5.21695 13.9247 5.13883 13.8605 5.0839 13.7782C5.02896 13.6959 4.99968 13.5992 4.99976 13.5002L4.99976 3.50022C4.99968 3.40127 5.02896 3.30452 5.0839 3.22222C5.13883 3.13993 5.21695 3.07578 5.30836 3.0379C5.39977 3.00003 5.50037 2.99013 5.59741 3.00945C5.69445 3.02878 5.78358 3.07646 5.85351 3.14647Z'
						fill='#696868'
					/>
				</svg>
			</Button>
		</div>
	);
}
