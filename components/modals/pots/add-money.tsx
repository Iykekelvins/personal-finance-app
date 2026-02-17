import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';
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
import { capitalizeWords, getThemeColor } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMoneyToPot } from '@/actions/pots';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	amount: z.string().min(1, { message: "can't be empty" }),
});

export default function AddMoney({
	pot,
	onClose,
}: {
	pot: PotProps;
	onClose: () => void;
}) {
	const color = getThemeColor(pot.theme);
	const totalSaved = ((pot?.total as number) / pot.target) * 100;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (form.formState.errors.amount) return;

		try {
			const res = await addMoneyToPot({
				_id: pot._id as string,
				amount: Number(values.amount),
			});

			if (!res.success) {
				toast.error(res?.error);
			} else {
				toast.success(
					`${Number(values.amount).toLocaleString()} added to ${capitalizeWords(pot.name)}`,
				);
				onClose();
				form.reset();
			}
		} catch (error) {
			console.error(error);
		}
	}

	const amount = useWatch({ control: form.control, name: 'amount' });
	const newSaved = (Number(amount) / pot.target) * 100;
	const overallSaved = totalSaved + newSaved;

	useEffect(() => {
		const total = Number(amount) + (pot.total ?? 0);

		if (total > pot.target) {
			form.setError('amount', {
				message: 'Amount has exceeded target',
			});
		} else {
			form.clearErrors('amount');
		}
	}, [amount, pot.total, pot.target, form]);

	return (
		<DialogContent>
			<DialogTitle>Add to ‘{capitalizeWords(pot.name)}’</DialogTitle>
			<DialogDescription>
				Add money to your pot to keep it separate from your main balance. As soon as
				you add this money, it will be deducted from your current balance.
			</DialogDescription>

			<div className='mt-[14.5px]'>
				<div className='flex items-center justify-between'>
					<p className='text-preset-4 text-grey-500'>New Amount</p>
					<h3 className='text-grey-900 font-bold text-preset-1'>
						${((pot?.total as number) + Number(amount)).toFixed(2)}
					</h3>
				</div>
			</div>

			<div>
				<div className='relative h-2 rounded-full bg-beige-100 overflow-hidden'>
					<div className='flex items-center gap-0.5 absolute top-0 left-0 h-full w-full'>
						<div
							className='rounded-l-full h-full bg-grey-900'
							style={{
								width: `${totalSaved}%`,
							}}
						/>
						<div
							className='rounded-r-full h-full'
							style={{
								width: `${newSaved}%`,
								backgroundColor: color,
							}}
						/>
					</div>
				</div>
				<div className='flex items-center justify-between mt-3.25'>
					<p
						className='text-preset-5 font-bold'
						style={{
							color,
						}}>
						{overallSaved > 100 ? 100 : overallSaved.toFixed(2)}%
					</p>
					<p className='text-preset-5 text-grey-500'>
						Target of ${pot.target.toLocaleString()}
					</p>
				</div>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='amount'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Amount to Add</FormLabel>
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

					<Button className='w-full mt-5' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting && <Spinner />}
						Confirm Addition
					</Button>
				</form>
			</Form>
		</DialogContent>
	);
}
