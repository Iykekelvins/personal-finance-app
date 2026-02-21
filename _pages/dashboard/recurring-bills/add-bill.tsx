'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import NewBill from '@/components/modals/bills/new-bill';

export default function AddBill() {
	const [openModal, setOpenModal] = useState(false);

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogTrigger asChild>
				<Button>+ Add New Bill</Button>
			</DialogTrigger>
			<NewBill onClose={() => setOpenModal(false)} />
		</Dialog>
	);
}
