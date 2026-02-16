'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import NewPot from '@/components/modals/new-pot';

export default function AddPot() {
	const [openNewPotModal, setOpenNewPotModal] = useState(false);

	return (
		<div className='flex items-center justify-between'>
			<h1 className='text-preset-2 md:text-preset-1 font-bold'>Pots</h1>
			<Dialog open={openNewPotModal} onOpenChange={setOpenNewPotModal}>
				<DialogTrigger asChild>
					<Button>+ Add New Pot</Button>
				</DialogTrigger>
				<NewPot onClose={() => setOpenNewPotModal(false)} />
			</Dialog>
		</div>
	);
}
