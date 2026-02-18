import { useForm } from 'react-hook-form';
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
import { toast } from 'sonner';
import { z } from 'zod';
import { topUpWallet } from '@/actions/wallet';

const formSchema = z.object({
	amount: z.string().min(1, { message: "can't be empty" }),
});

export default function WalletTopup({ onClose }: { onClose: () => void }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await topUpWallet(+values.amount);

			if (!res.success) {
				toast.error(res.error);
			} else {
				toast.success('Wallet top up successful');
				onClose();
				form.reset();
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<DialogContent>
			<DialogTitle>Wallet Top Up</DialogTitle>
			<DialogDescription>Add money to your wallet balance.</DialogDescription>

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
						Confirm Top Up
					</Button>
				</form>
			</Form>
		</DialogContent>
	);
}
