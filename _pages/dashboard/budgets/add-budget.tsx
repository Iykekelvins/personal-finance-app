'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import NewBudget from '@/components/modals/budgets/new-budget';

export default function AddBudget() {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div className='flex items-center justify-between'>
			<h1 className='text-preset-2 md:text-preset-1 font-bold'>Budgets</h1>
			<Dialog open={openModal} onOpenChange={setOpenModal}>
				<DialogTrigger asChild>
					<Button>+ Add New Budget</Button>
				</DialogTrigger>
				<NewBudget onClose={() => setOpenModal(false)} open={openModal} />
			</Dialog>
		</div>
	);
}
