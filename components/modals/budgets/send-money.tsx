import { useForm } from 'react-hook-form';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { sendMoney } from '@/actions/budgets';
import { z } from 'zod';

import Image from 'next/image';

const formSchema = z.object({
	amount: z.string().min(1, { message: "can't be empty" }),
	name: z.string().min(1, { message: "can't be empty" }),
	avatar: z.string().min(1, { message: "can't be empty" }),
});

export default function SendMoney({
	budget,
	onClose,
}: {
	budget: BudgetProps;
	onClose: () => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '',
			avatar: '',
			name: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await sendMoney({
				id: budget._id as string,
				amount: +values.amount,
				name: values.name,
				avatar: values.avatar,
			});

			if (!res.success) {
				toast.error(res.error);
			} else {
				toast.success('Transfer is successful');
				form.reset();
				setTimeout(() => {
					onClose();
				}, 150);
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
			<DialogTitle>Spend from ‘{capitalizeWords(budget.category)}’</DialogTitle>
			<DialogDescription>
				Send money from this budget. This will be deducted from your main balance.
			</DialogDescription>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-200'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Person/Company Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder='John Doe' />
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
						name='amount'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Amount to Send</FormLabel>
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
						<span>Send Money</span>
					</Button>
				</form>
			</Form>
		</DialogContent>
	);
}
