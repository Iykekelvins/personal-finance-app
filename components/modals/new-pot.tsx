'use client';

import { useForm } from 'react-hook-form';
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { THEMES } from '@/lib/constants';
import { handleError } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEffect } from 'react';

const potFormSchema = z.object({
	name: z.string().min(1, { message: "can't be empty" }).max(30),
	target: z.string().min(1, { message: "can't be empty" }),
	theme: z.string().min(1, { message: "can't be empty" }),
});

export default function NewPot({
	pot,
	onClose,
}: {
	pot?: PotProps;
	onClose: () => void;
}) {
	const form = useForm<z.infer<typeof potFormSchema>>({
		resolver: zodResolver(potFormSchema),
		defaultValues: {
			name: '',
			target: '',
			theme: '',
		},
	});

	async function onSubmit(values: z.infer<typeof potFormSchema>) {
		try {
			const response = await fetch('/api/pots', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					...values,
					target: +values.target,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				toast.success(data?.message);
				onClose();
				form.reset();
			} else {
				toast.error(data?.message);
			}
		} catch (error) {
			handleError(error);
		}
	}

	useEffect(() => {
		if (!pot) return;

		form.reset({
			name: pot.name,
			target: pot.target.toString(),
			theme: pot.theme,
		});
	}, [pot, form]);

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{!pot ? 'Add New' : 'Edit'} Pot</DialogTitle>
			</DialogHeader>
			<DialogDescription>
				{!pot
					? `Create a pot to set savings targets. These can help keep you on track as you
				save for special purchases.`
					: 'If your saving targets change, feel free to update your pots.'}
			</DialogDescription>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-200'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pot Name</FormLabel>
								<FormControl>
									<Input {...field} maxLength={30} />
								</FormControl>
								<FormMessage />
								<FormDescription className='text-right'>
									{30 - form.getValues('name').length} character
									{(form.getValues('name').length === 30 ||
										form.getValues('name').length < 29) &&
										's'}{' '}
									left
								</FormDescription>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='target'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Target</FormLabel>
								<FormControl>
									<Input {...field} isCurrency placeholder='e.g. 2000' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='theme'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Theme</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select a theme' />
										</SelectTrigger>
									</FormControl>
									<SelectContent align='start'>
										{THEMES.map((theme) => (
											<SelectItem key={theme.name} value={theme.name}>
												<span
													className='size-4 rounded-full'
													style={{
														backgroundColor: theme.color,
													}}
												/>{' '}
												<span>{theme.name}</span>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='w-full' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting && <Spinner />}
						Add Pot
					</Button>
				</form>
			</Form>
		</DialogContent>
	);
}
