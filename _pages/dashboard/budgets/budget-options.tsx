'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PopoverContent } from '@/components/ui/popover';

import NewBudget from '@/components/modals/budgets/new-budget';
import DeleteBudget from '@/components/modals/budgets/delete-budget';

export default function BudgetOptions({
	budget,
	setOpenBudgetOptions,
}: {
	budget: BudgetProps;
	setOpenBudgetOptions: (e: boolean) => void;
}) {
	const [openEditBudgetModal, setOpenEditBudgetModal] = useState(false);
	const [openDeleteBudgetModal, setOpenDeleteBudgetModal] = useState(false);

	return (
		<PopoverContent align='end' className='grid py-150 px-250'>
			<Dialog open={openEditBudgetModal} onOpenChange={setOpenEditBudgetModal}>
				<DialogTrigger asChild>
					<button
						className='text-preset-4 pb-3 border-b 
                border-b-grey-100 border-solid leading-normal text-left'>
						Edit Pot
					</button>
				</DialogTrigger>
				<NewBudget
					budget={budget}
					open={openEditBudgetModal}
					onClose={() => {
						setOpenEditBudgetModal(false);
						setOpenBudgetOptions(false);
					}}
				/>
			</Dialog>
			<Dialog open={openDeleteBudgetModal} onOpenChange={setOpenDeleteBudgetModal}>
				<DialogTrigger asChild>
					<button className='text-red text-preset-4 leading-normal text-left pt-3'>
						Delete Budget
					</button>
				</DialogTrigger>
				<DeleteBudget
					budget={budget}
					onClose={() => {
						setOpenDeleteBudgetModal(false);
						setOpenBudgetOptions(false);
					}}
				/>
			</Dialog>
		</PopoverContent>
	);
}
