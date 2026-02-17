'use client';

import { usePathname } from 'next/navigation';
import { Bills, Budgets, Overview, Pots, Transactions } from './icons';
import { cn } from '@/lib/utils';

import Link from 'next/link';

const TABLINKS = [
	{
		name: 'Overview',
		href: '/',
		icon: <Overview />,
	},
	{
		name: 'Transactions',
		href: '/transactions',
		icon: <Transactions />,
	},
	{
		name: 'Budgets',
		href: '/budgets',
		icon: <Budgets />,
	},
	{
		name: 'Pots',
		href: '/pots',
		icon: <Pots />,
	},
	{
		name: 'Recurring Bills',
		href: '/recurring-bills',
		icon: <Bills />,
	},
];

export default function Tabs() {
	const pathname = usePathname();

	return (
		<div
			className='fixed bottom-0 left-0 w-full bg-grey-900 lg:hidden
      rounded-t-lg pt-100 px-200 md:px-500
      '>
			<ul className='flex items-center justify-between md:gap-x-10.5'>
				{TABLINKS.map((link) => (
					<li key={link.name} className='flex-1'>
						<Link
							href={link.href}
							className={cn(
								'flex flex-col items-center justify-center rounded-t-lg pt-100 pb-150',
								link.href === pathname &&
									'bg-beige-100 [&_svg_path]:fill-green border-b-4 border-b-green',
							)}>
							{link.icon}
							<span
								className={cn(
									'text-preset-5 font-bold text-gray-300 hidden md:block whitespace-nowrap',
									'leading-normal mt-1',
									link.href === pathname && 'text-grey-900',
								)}>
								{link.name}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
