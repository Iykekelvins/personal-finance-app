'use client';

import { useState } from 'react';
import { Button } from '../../ui/button';
import { DialogContent, DialogDescription, DialogTitle } from '../../ui/dialog';
import { Spinner } from '../../ui/spinner';
import { deleteBudget } from '@/actions/budgets';
import { toast } from 'sonner';

export default function DeleteBudget({
	budget,
	onClose,
}: {
	budget: BudgetProps;
	onClose: () => void;
}) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleBudgetDelete = async () => {
		setIsDeleting(true);

		try {
			const res = await deleteBudget(budget?._id as string);

			if (!res.success) {
				toast.error(res?.error);
			} else {
				toast.success('Budget deleted successfully');
				setTimeout(() => {
					onClose();
				}, 150);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
			<DialogTitle>Delete ‘{budget?.category}’?</DialogTitle>
			<DialogDescription>
				Are you sure you want to delete this budget? This action cannot be reversed,
				and all the data inside it will be removed forever.
			</DialogDescription>
			<Button
				variant={'destructive'}
				disabled={isDeleting}
				onClick={handleBudgetDelete}>
				{isDeleting && <Spinner />}
				<span>Yes, Confirm Deletion</span>
			</Button>
			<button className='text-preset-4 text-gray-500' onClick={onClose}>
				No, Go Back
			</button>
		</DialogContent>
	);
}
