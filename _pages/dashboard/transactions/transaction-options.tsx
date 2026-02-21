'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PopoverContent } from '@/components/ui/popover';

import DeleteTransaction from '@/components/modals/delete-transaction';

export default function TransactionOptions({ id }: { id: string }) {
	const [openDeletePotModal, setOpenDeletePotModal] = useState(false);

	return (
		<PopoverContent align='end' className='grid py-150 px-250'>
			<Dialog open={openDeletePotModal} onOpenChange={setOpenDeletePotModal}>
				<DialogTrigger asChild>
					<button className='text-red text-preset-4 leading-normal text-left'>
						Delete Transaction
					</button>
				</DialogTrigger>
				<DeleteTransaction id={id} onClose={() => setOpenDeletePotModal(false)} />
			</Dialog>
		</PopoverContent>
	);
}
