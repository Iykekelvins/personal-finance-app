'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PopoverContent } from '@/components/ui/popover';

import NewPot from '@/components/modals/new-pot';

export default function PotOptions({ pot }: { pot: PotProps }) {
	const [openEditPotModal, setOpenEditPotModal] = useState(false);
	const [openDeletePotModal, setOpenDeletePotModal] = useState(false);

	return (
		<PopoverContent align='end'>
			<Dialog open={openEditPotModal} onOpenChange={setOpenEditPotModal}>
				<DialogTrigger asChild>
					<button className='text-preset-4'>Edit Pot</button>
				</DialogTrigger>
				<NewPot pot={pot} onClose={() => setOpenEditPotModal(false)} />
			</Dialog>
		</PopoverContent>
	);
}
