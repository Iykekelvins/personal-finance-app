'use client';

import { useState } from 'react';
import { Button } from '../../ui/button';
import { DialogContent, DialogDescription, DialogTitle } from '../../ui/dialog';
import { Spinner } from '../../ui/spinner';
import { toast } from 'sonner';
import { deleteBill } from '@/actions/bills';

export default function DeleteBill({
	bill,
	onClose,
}: {
	bill: BillProps | null;
	onClose: () => void;
}) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleBillDelete = async () => {
		setIsDeleting(true);

		try {
			const res = await deleteBill(bill?._id as string);

			if (!res.success) {
				toast.error(res?.error);
			} else {
				toast.success('Bill deleted successfully');
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
			<DialogTitle>Delete ‘{bill?.title}’?</DialogTitle>
			<DialogDescription>
				Are you sure you want to delete this bill? This action cannot be reversed,
				and all the data inside it will be removed forever.
			</DialogDescription>
			<Button
				variant={'destructive'}
				disabled={isDeleting}
				onClick={handleBillDelete}>
				{isDeleting && <Spinner />}
				<span>Yes, Confirm Deletion</span>
			</Button>
			<button className='text-preset-4 text-gray-500' onClick={onClose}>
				No, Go Back
			</button>
		</DialogContent>
	);
}
