'use client';

import { useState } from 'react';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Ellipsis } from 'lucide-react';
import { THEMES } from '@/lib/constants';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import PotOptions from './pot-options';
import AddMoney from '@/components/modals/pots/add-money';
import Withdraw from '@/components/modals/pots/withdraw';

export default function Pot({ pot }: { pot: PotProps }) {
	const color = THEMES.find((t) => t.name === pot.theme)?.color;
	const totalSaved = ((pot?.total as number) / pot.target) * 100;

	const [openPotOptions, setOpenPotOptions] = useState(false);
	const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
	const [openAddMoneyModal, setOpenAddMoneyModal] = useState(false);

	return (
		<div className='bg-white rounded-150 p-300'>
			<div className='flex items-center justify-between'>
				<h2 className='flex items-center gap-200'>
					<span
						className='size-4 rounded-full'
						style={{
							backgroundColor: color,
						}}
					/>
					<span className='text-preset-2 font-bold capitalize'>{pot.name}</span>
				</h2>

				<Popover open={openPotOptions} onOpenChange={setOpenPotOptions}>
					<PopoverTrigger asChild>
						<button>
							<Ellipsis className='text-grey-300' />
						</button>
					</PopoverTrigger>
					<PotOptions pot={pot} setOpenPotOptions={setOpenPotOptions} />
				</Popover>
			</div>

			<div className='mt-400'>
				<div className='flex items-center justify-between'>
					<p className='text-preset-4 text-grey-500'>Total Saved</p>
					<h3 className='text-grey-900 font-bold text-preset-1'>
						${(pot?.total as number).toFixed(2)}
					</h3>
				</div>
			</div>

			<div className='mt-200'>
				<div className='relative h-2 rounded-full bg-beige-100 overflow-hidden'>
					<div
						className='absolute top-0 left-0 h-full rounded-full'
						style={{
							backgroundColor: color,
							width: `${totalSaved}%`,
						}}
					/>
				</div>
				<div className='flex items-center justify-between mt-3.25'>
					<p className='text-preset-5 text-grey-500 font-bold'>
						{totalSaved.toFixed(2)}%
					</p>
					<p className='text-preset-5 text-grey-500'>
						Target of ${pot.target.toLocaleString()}
					</p>
				</div>
			</div>

			<div className='mt-400 flex items-center gap-200'>
				<Dialog open={openAddMoneyModal} onOpenChange={setOpenAddMoneyModal}>
					<DialogTrigger asChild>
						<Button variant={'secondary'} className='w-1/2'>
							+ Add Money
						</Button>
					</DialogTrigger>
					<AddMoney pot={pot} />
				</Dialog>
				<Dialog open={openWithdrawModal} onOpenChange={setOpenWithdrawModal}>
					<DialogTrigger asChild>
						<Button variant={'secondary'} className='w-1/2'>
							Withdraw
						</Button>
					</DialogTrigger>
					<Withdraw pot={pot} />
				</Dialog>
			</div>
		</div>
	);
}
