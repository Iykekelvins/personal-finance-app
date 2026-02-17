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
import { capitalizeWords } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { withdrawMoneyFromPot } from '@/actions/pots';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	amount: z.string().min(1, { message: "can't be empty" }),
});

export default function Withdraw({
	pot,
	onClose,
}: {
	pot: PotProps;
	onClose: () => void;
}) {
	const totalSavedPercent = ((pot?.total as number) / pot.target) * 100;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (form.formState.errors.amount) return;

		try {
			const res = await withdrawMoneyFromPot({
				_id: pot._id as string,
				amount: Number(values.amount),
			});

			if (!res.success) {
				toast.error(res?.error);
			} else {
				toast.success(
					`$${Number(values.amount).toLocaleString()} has been withdrawn from ${capitalizeWords(pot.name)}`,
				);
				onClose();
				form.reset();
			}
		} catch (error) {
			console.error(error);
		}
	}

	const amount = useWatch({ control: form.control, name: 'amount' });
	const newSavedPercent = (Number(amount) / pot.target) * 100;
	const overallSavedPercent = totalSavedPercent - newSavedPercent;
	const withdrawnPercent = (Number(amount) / pot.total!) * 100;

	const newAmount = (pot?.total as number) - Number(amount);

	useEffect(() => {
		if (Number(amount) > (pot.total ?? 0)) {
			form.setError('amount', {
				message: 'Amount has exceeded total',
			});
		} else {
			form.clearErrors('amount');
		}
	}, [amount, pot.total, form]);

	return (
		<DialogContent>
			<DialogTitle>Withdraw from ‘{capitalizeWords(pot.name)}’</DialogTitle>
			<DialogDescription>
				Withdraw from your pot to put money back in your main balance. This will
				reduce the amount you have in this pot.
			</DialogDescription>

			<div className='mt-[14.5px]'>
				<div className='flex items-center justify-between'>
					<p className='text-preset-4 text-grey-500'>New Amount</p>
					<h3 className='text-grey-900 font-bold text-preset-1'>
						${newAmount < 0 ? 0 : newAmount.toFixed(2)}
					</h3>
				</div>
			</div>

			<div>
				<div className='relative h-2 rounded-full bg-beige-100 overflow-hidden'>
					<div className='flex items-center gap-0.5 absolute top-0 left-0 h-full w-full'>
						<div
							className='rounded-l-full h-full bg-grey-900'
							style={{
								width: `${totalSavedPercent}%`,
							}}
						/>
						<div
							className='rounded-r-full h-full bg-red'
							style={{
								width: `${withdrawnPercent > 100 ? 100 : withdrawnPercent}%`,
							}}
						/>
					</div>
				</div>
				<div className='flex items-center justify-between mt-3.25'>
					<p className='text-preset-5 font-bold text-red'>
						{overallSavedPercent < 0 ? 0 : overallSavedPercent.toFixed(2)}%
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
								<FormLabel>Amount to Withdraw</FormLabel>
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
						Confirm Withdrawal
					</Button>
				</form>
			</Form>
		</DialogContent>
	);
}
