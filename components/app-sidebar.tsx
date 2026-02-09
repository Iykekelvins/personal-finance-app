'use client';

import { usePathname } from 'next/navigation';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	useSidebar,
} from '@/components/ui/sidebar';
import { Bills, Budgets, Overview, Pots, Transactions } from './icons';
import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';

const SIDEBARLINKS = [
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

export function AppSidebar() {
	const pathname = usePathname();
	const { toggleSidebar, open } = useSidebar();

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader className='py-500 px-400'>
				<Link href='/'>
					{open ? (
						<Image
							src='/logo.png'
							width={121.45}
							height={21.76}
							alt='finance logo'
						/>
					) : (
						<svg
							width='13'
							height='22'
							viewBox='0 0 13 22'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M8.192 21.44H2.176V10.24H0V5.312H2.304C2.944 2.272 5.92 0 11.2 0H12.48V4.288H10.24C8.576 4.288 7.776 4.448 7.808 5.312H12.48V10.24H8.192V21.44Z'
								fill='white'
							/>
						</svg>
					)}
				</Link>
			</SidebarHeader>
			<SidebarContent className='mt-6 pr-300'>
				<ul>
					{SIDEBARLINKS.map((link) => (
						<li key={link.name}>
							<Link
								href={link.href}
								className={cn(
									'flex items-center gap-200 h-14 rounded-r-xl',
									'[&_svg_path]:transition-all [&_svg_path]:duration-300 [&_svg_path]:ease-in-out',
									link.href !== pathname &&
										'hover:[&_svg_path]:fill-grey-100 hover:[&_span]:text-grey-100',
									link.href === pathname &&
										'bg-beige-100 [&_svg_path]:fill-green border-l-4 border-l-green',
									open && 'pl-400',
									!open && 'justify-center',
								)}>
								{link.icon}{' '}
								{open && (
									<span
										className={cn(
											'text-preset-3 text-grey-300 font-bold',
											'transition-colors duration-300 ease-in-out',
											link.href === pathname && 'text-grey-900',
										)}>
										{link.name}
									</span>
								)}
							</Link>
						</li>
					))}
				</ul>
			</SidebarContent>
			<SidebarFooter className='pb-300'>
				<button
					className={cn(
						`flex items-center gap-200 py-200 text-grey-300!
          transition-colors duration-300 ease-in-out hover:text-grey-100! text-preset-3
          [&_svg_path]:transition-all [&_svg_path]:duration-300 [&_svg_path]:ease-in-out
          hover:[&_svg_path]:fill-grey-100`,
						open && 'px-400',
						!open && 'justify-center [&_svg]:rotate-180',
					)}
					onClick={toggleSidebar}>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M15.0001 7.50001L15.0001 16.5C15.0001 16.6989 14.9211 16.8897 14.7804 17.0303C14.6398 17.171 14.449 17.25 14.2501 17.25H12.0001L12.0001 21C12.0002 21.1484 11.9563 21.2936 11.8739 21.417C11.7915 21.5404 11.6743 21.6367 11.5372 21.6935C11.4001 21.7503 11.2492 21.7651 11.1036 21.7362C10.9581 21.7072 10.8244 21.6356 10.7195 21.5306L1.71948 12.5306C1.64974 12.461 1.59443 12.3783 1.55668 12.2872C1.51894 12.1962 1.49951 12.0986 1.49951 12C1.49951 11.9015 1.51894 11.8039 1.55668 11.7128C1.59443 11.6218 1.64974 11.539 1.71948 11.4694L10.7195 2.46939C10.8244 2.36438 10.9581 2.29285 11.1036 2.26386C11.2492 2.23488 11.4001 2.24973 11.5372 2.30654C11.6743 2.36336 11.7915 2.45958 11.8739 2.58302C11.9563 2.70647 12.0002 2.85159 12.0001 3.00001V6.75001H14.2501C14.449 6.75001 14.6398 6.82903 14.7804 6.96968C14.9211 7.11033 15.0001 7.3011 15.0001 7.50001ZM17.2501 6.75001C17.0512 6.75001 16.8604 6.82903 16.7198 6.96968C16.5791 7.11033 16.5001 7.3011 16.5001 7.50001V16.5C16.5001 16.6989 16.5791 16.8897 16.7198 17.0303C16.8604 17.171 17.0512 17.25 17.2501 17.25C17.449 17.25 17.6398 17.171 17.7804 17.0303C17.9211 16.8897 18.0001 16.6989 18.0001 16.5L18.0001 7.50001C18.0001 7.3011 17.9211 7.11033 17.7804 6.96968C17.6398 6.82903 17.449 6.75001 17.2501 6.75001ZM20.2501 6.75001C20.0512 6.75001 19.8604 6.82903 19.7198 6.96968C19.5791 7.11033 19.5001 7.3011 19.5001 7.50001L19.5001 16.5C19.5001 16.6989 19.5791 16.8897 19.7198 17.0303C19.8604 17.171 20.0512 17.25 20.2501 17.25C20.449 17.25 20.6398 17.171 20.7804 17.0303C20.9211 16.8897 21.0001 16.6989 21.0001 16.5L21.0001 7.50001C21.0001 7.3011 20.9211 7.11033 20.7804 6.96968C20.6398 6.82903 20.449 6.75001 20.2501 6.75001Z'
							fill='#B3B3B3'
						/>
					</svg>
					{open && <span>Minimize Menu</span>}
				</button>
			</SidebarFooter>
		</Sidebar>
	);
}
