'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CATEGORIES, THEMES } from '@/lib/constants';
import { handleError } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

const budgetFormSchema = z.object({
	category: z.string().min(1, { message: "can't be empty" }),
	maximum: z.string().min(1, { message: "can't be empty" }),
	theme: z.string().min(1, { message: "can't be empty" }),
});

export default function NewBudget() {
	const [openModal, setOpenModal] = useState(false);

	const form = useForm<z.infer<typeof budgetFormSchema>>({
		resolver: zodResolver(budgetFormSchema),
		defaultValues: {
			category: '',
			maximum: '',
			theme: '',
		},
	});

	async function onSubmit(values: z.infer<typeof budgetFormSchema>) {
		try {
			const response = await fetch('/api/budgets', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					...values,
					maximum: +values.maximum,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				toast.success(data?.message);
				setOpenModal(false);
				form.reset();
			} else {
				toast.error(data?.message);
			}
		} catch (error) {
			handleError(error);
		}
	}

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogTrigger asChild>
				<Button>+ Add New Budget</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Budget</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Choose a category to set a spending budget. These categories can help you
					monitor spending.
				</DialogDescription>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-200'>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Budget Category</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a category' />
											</SelectTrigger>
										</FormControl>
										<SelectContent align='start'>
											{CATEGORIES.map((cat) => (
												<SelectItem key={cat} value={cat}>
													{cat}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='maximum'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Maximum Spend</FormLabel>
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
							Add Budget
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
