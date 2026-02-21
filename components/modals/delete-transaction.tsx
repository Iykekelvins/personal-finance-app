'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Spinner } from '../ui/spinner';
import { toast } from 'sonner';
import { deleteTransaction } from '@/actions/transactions';

export default function DeleteTransaction({
	id,
	onClose,
}: {
	id: string;
	onClose: () => void;
}) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleTransactionDelete = async () => {
		setIsDeleting(true);

		try {
			const res = await deleteTransaction(id as string);

			if (!res.success) {
				toast.error(res?.error);
			} else {
				toast.success('Transaction deleted successfully');
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
			<DialogTitle>Delete Transaction?</DialogTitle>
			<DialogDescription>
				Are you sure you want to delete this transaction? This action cannot be
				reversed, and all the data inside it will be removed forever.
			</DialogDescription>
			<Button
				variant={'destructive'}
				disabled={isDeleting}
				onClick={handleTransactionDelete}>
				{isDeleting && <Spinner />}
				<span>Yes, Confirm Deletion</span>
			</Button>
			<button className='text-preset-4 text-gray-500' onClick={onClose}>
				No, Go Back
			</button>
		</DialogContent>
	);
}
