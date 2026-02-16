'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PopoverContent } from '@/components/ui/popover';

import NewPot from '@/components/modals/new-pot';
import DeletePot from '@/components/modals/delete-pot';

export default function PotOptions({
	pot,
	setOpenPotOptions,
}: {
	pot: PotProps;
	setOpenPotOptions: (e: boolean) => void;
}) {
	const [openEditPotModal, setOpenEditPotModal] = useState(false);
	const [openDeletePotModal, setOpenDeletePotModal] = useState(false);

	return (
		<PopoverContent align='end' className='grid py-150 px-250'>
			<Dialog open={openEditPotModal} onOpenChange={setOpenEditPotModal}>
				<DialogTrigger asChild>
					<button
						className='text-preset-4 pb-3 border-b 
					border-b-grey-100 border-solid leading-normal text-left'>
						Edit Pot
					</button>
				</DialogTrigger>
				<NewPot
					pot={pot}
					onClose={() => {
						setOpenEditPotModal(false);
						setOpenPotOptions(false);
					}}
				/>
			</Dialog>
			<Dialog open={openDeletePotModal} onOpenChange={setOpenDeletePotModal}>
				<DialogTrigger asChild>
					<button className='text-red text-preset-4 leading-normal text-left pt-3'>
						Delete Pot
					</button>
				</DialogTrigger>
				<DeletePot
					pot={pot}
					onClose={() => {
						setOpenDeletePotModal(false);
						setOpenPotOptions(false);
					}}
				/>
			</Dialog>
		</PopoverContent>
	);
}
