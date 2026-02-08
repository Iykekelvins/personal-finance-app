'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';

import Link from 'next/link';

const loginFormSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

const SignIn = () => {
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { isLoaded, signIn, setActive } = useSignIn();

	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		setIsLoading(true);

		if (!isLoaded) return;

		try {
			const signInAttempt = await signIn.create({
				identifier: values.email,
				password: values.password,
			});

			if (signInAttempt.status === 'complete') {
				await setActive({
					session: signInAttempt.createdSessionId,
					navigate: async ({ session }) => {
						if (session?.currentTask) {
							console.log(session?.currentTask);
							return;
						}

						router.refresh();
					},
				});
			}
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				console.log(error);

				const isIncorrectPassword = error.errors?.some(
					(e) =>
						e.code === 'authentication_invalid_credentials' ||
						e.longMessage?.includes('password'),
				);

				if (isIncorrectPassword) {
					toast.error('Invalid credentials. Check email and password again.');
					return;
				}

				toast.error(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div
			className='w-140 bg-white rounded-150 
			py-300 px-250 md:p-400'>
			<h1 className='text-preset-1 font-bold'>Login</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-200 mt-400'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...field} type='password' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button className='w-full mt-200' disabled={isLoading}>
						{isLoading && <Spinner />}
						<span>Login</span>
					</Button>
				</form>
			</Form>

			<p className='text-center mt-400 text-preset-4 text-grey-500'>
				Need to create an account?{' '}
				<Link href='/sign-up' className='font-bold underline text-grey-900'>
					Sign Up
				</Link>
			</p>
		</div>
	);
};

export default SignIn;
