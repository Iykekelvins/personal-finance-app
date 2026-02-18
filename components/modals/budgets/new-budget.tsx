'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../../ui/dialog';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CATEGORIES, THEMES } from '@/lib/constants';
import { createBudget, editBudget } from '@/actions/budgets';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalizeWords } from '@/lib/utils';
import { toast } from 'sonner';
import { z } from 'zod';

const budgetFormSchema = z.object({
	category: z.string().min(1, { message: "can't be empty" }),
	maximum: z.string().min(1, { message: "can't be empty" }),
	theme: z.string().min(1, { message: "can't be empty" }),
});

export default function NewBudget({
	budget,
	open,
	onClose,
}: {
	budget?: BudgetProps;
	open: boolean;
	onClose: () => void;
}) {
	const [categories, setCategories] = useState<string[]>([]);

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
			if (!budget) {
				const res = await createBudget({ ...values, maximum: +values.maximum });

				if (!res.success) {
					toast.error(res?.error);
				} else {
					toast.success('Budget created successfully');
					onClose();
					form.reset();
				}
			} else {
				const res = await editBudget({
					...values,
					_id: budget._id,
					maximum: +values.maximum,
				});

				if (!res.success) {
					toast.error(res?.error);
				} else {
					toast.success('Budget edited successfully');
					onClose();
					form.reset();
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (!budget) return;

		form.reset({
			category: capitalizeWords(budget.category),
			maximum: budget.maximum.toString(),
			theme: budget.theme,
		});
	}, [budget, form]);

	useEffect(() => {
		fetch('/api/budgets')
			.then((res) => res.json())
			.then((data) =>
				setCategories(
					data?.categories.map((cat: { category: string }) => cat.category),
				),
			);
	}, [open]);

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{!budget ? 'Add New' : 'Edit'} Budget</DialogTitle>
			</DialogHeader>
			<DialogDescription>
				{!budget
					? `Choose a category to set a spending budget. These categories can help you
				monitor spending.`
					: 'As your budgets change, feel free to update your spending limits.'}
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
										<SelectTrigger className='[&_.used]:hidden'>
											<SelectValue placeholder='Select a category' />
										</SelectTrigger>
									</FormControl>
									<SelectContent align='start'>
										{CATEGORIES.map((cat) => (
											<SelectItem
												key={cat}
												value={cat}
												disabled={categories.includes(cat)}>
												<span>{cat}</span>
												{categories.includes(cat) && (
													<span className='absolute right-2 used'>already used</span>
												)}
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
						{!budget ? 'Add Budget' : 'Save Changes'}
					</Button>
				</form>
			</Form>
		</DialogContent>
	);
}
