'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PopoverContent } from '@/components/ui/popover';

import NewBill from '@/components/modals/new-bill';

export default function BillOptions({ bill }: { bill: BillProps | null }) {
	const [openEditPotModal, setOpenEditPotModal] = useState(false);
	const [openDeletePotModal, setOpenDeletePotModal] = useState(false);

	return (
		<PopoverContent align='end' className='grid py-150 px-250'>
			<Dialog open={openEditPotModal} onOpenChange={setOpenEditPotModal}>
				<DialogTrigger asChild>
					<button
						className='text-preset-4 pb-3 border-b 
					border-b-grey-100 border-solid leading-normal text-left'>
						Edit Bill
					</button>
				</DialogTrigger>
				<NewBill bill={bill!} onClose={() => setOpenEditPotModal(false)} />
			</Dialog>
			<Dialog open={openDeletePotModal} onOpenChange={setOpenDeletePotModal}>
				<DialogTrigger asChild>
					<button className='text-red text-preset-4 leading-normal text-left pt-3'>
						Delete Bill
					</button>
				</DialogTrigger>
				{/* <DeletePot
					pot={pot}
					onClose={() => {
						setOpenDeletePotModal(false);
						setOpenPotOptions(false);
					}}
				/> */}
			</Dialog>
		</PopoverContent>
	);
}
