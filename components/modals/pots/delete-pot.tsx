'use client';

import { useState } from 'react';
import { Button } from '../../ui/button';
import { DialogContent, DialogDescription, DialogTitle } from '../../ui/dialog';
import { Spinner } from '../../ui/spinner';
import { deletePot } from '@/actions/pots';
import { toast } from 'sonner';

export default function DeletePot({
	pot,
	onClose,
}: {
	pot: PotProps;
	onClose: () => void;
}) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handlePotDelete = async () => {
		setIsDeleting(true);

		try {
			const res = await deletePot(pot?._id as string);

			if (!res.success) {
				toast.error(res?.error);
			} else {
				toast.success('Pot deleted successfully');
				onClose();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<DialogContent>
			<DialogTitle>Delete ‘{pot?.name}’?</DialogTitle>
			<DialogDescription>
				Are you sure you want to delete this pot? This action cannot be reversed, and
				all the data inside it will be removed forever.
			</DialogDescription>
			<Button
				variant={'destructive'}
				disabled={isDeleting}
				onClick={handlePotDelete}>
				{isDeleting && <Spinner />}
				<span>Yes, Confirm Deletion</span>
			</Button>
			<button className='text-preset-4 text-gray-500' onClick={onClose}>
				No, Go Back
			</button>
		</DialogContent>
	);
}
