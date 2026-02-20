import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { createBill, editBill } from '@/actions/bills';
import {
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { z } from 'zod';

import Image from 'next/image';

const formSchema = z.object({
	amount: z.string().min(1, { message: "can't be empty" }),
	dayOfMonth: z.string().min(1, { message: "can't be empty" }),
	title: z.string().min(1, { message: "can't be empty" }),
	avatar: z.string().min(1, { message: "can't be empty" }),
});

export default function NewBill({
	bill,
	onClose,
}: {
	bill?: BillProps;
	onClose: () => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '',
			avatar: '',
			title: '',
			dayOfMonth: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (!bill) {
				const res = await createBill({
					...values,
					amount: +values.amount,
					dayOfMonth: +values.dayOfMonth,
				});

				if (!res.success) {
					toast.error(res?.error);
				} else {
					toast.success('Bill created successfully');
					form.reset();
					setTimeout(() => {
						onClose();
					}, 150);
				}
			} else {
				const res = await editBill({
					...values,
					_id: bill._id,
					amount: +values.amount,
					dayOfMonth: +values.dayOfMonth,
				});

				if (!res.success) {
					toast.error(res?.error);
				} else {
					toast.success('Bill edited successfully');
					form.reset();
					setTimeout(() => {
						onClose();
					}, 150);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (!bill) return;

		form.reset({
			title: bill.title,
			amount: bill.amount.toString(),
			dayOfMonth: bill.dayOfMonth.toString(),
			avatar: bill.avatar,
		});
	}, [bill, form]);

	return (
		<DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
			<DialogTitle>{!bill ? 'Add' : 'Edit'} Bill</DialogTitle>
			<DialogDescription>
				{!bill
					? 'Add a recurring bill and input the day its due monthly.'
					: 'Edit current recurring bill.'}
			</DialogDescription>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-200'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bill Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Netflix' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='avatar'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Avatar</FormLabel>
								<Select value={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Choose an avatar' />
											<SelectContent align='start' className='py-200 px-150'>
												<div className='grid place-items-center grid-cols-3 gap-300'>
													{[...Array(15)].map((_, i) => (
														<SelectItem
															key={i}
															className='w-fit p-0 [&_.check]:hidden'
															value={`/companies/logo-${i + 1}.png`}>
															<Image
																src={`/companies/logo-${i + 1}.png`}
																width={36}
																height={36}
																alt={`company-logo-${i + 1}`}
															/>
														</SelectItem>
													))}
													{[...Array(15)].map((_, i) => (
														<SelectItem
															key={i}
															className='w-fit p-0 [&_.check]:hidden'
															value={`/people/person-${i + 1}.png`}>
															<Image
																src={`/people/person-${i + 1}.png`}
																width={36}
																height={36}
																alt={`person-${i + 1}`}
															/>
														</SelectItem>
													))}
												</div>
											</SelectContent>
										</SelectTrigger>
									</FormControl>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='dayOfMonth'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Day of Month</FormLabel>
								<FormControl>
									<Input
										type='number'
										{...field}
										placeholder='15'
										min={1}
										max={31}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='amount'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bill Amount</FormLabel>
								<FormControl>
									<Input
										type='number'
										min={1}
										{...field}
										isCurrency
										placeholder='e.g. 400'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='w-full' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting && <Spinner />}
						<span>{!bill ? 'Create Bill' : 'Save Changes'}</span>
					</Button>
				</form>
			</Form>
		</DialogContent>
	);
}
