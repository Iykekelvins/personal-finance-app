'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { z } from 'zod';
import { cn } from '@/lib/utils';

import Link from 'next/link';

const signUpFormSchema = z.object({
	name: z.string().min(1, { message: "can't be empty" }),
	email: z.email(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(100, 'Password must be less than 100 characters'),
});

const codeFormSchema = z.object({
	code: z.string().min(6, "Can't be empty"),
});

const SignUp = () => {
	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const codeForm = useForm<z.infer<typeof codeFormSchema>>({
		resolver: zodResolver(codeFormSchema),
		defaultValues: {
			code: '',
		},
	});

	const { isLoaded, signUp, setActive } = useSignUp();

	const [isLoading, setIsLoading] = useState(false);
	const [verifying, setVerifying] = useState(false);

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
		setIsLoading(true);

		if (!isLoaded) return;

		try {
			await signUp?.create({
				emailAddress: values.email,
				password: values.password,
			});

			await signUp?.prepareEmailAddressVerification({
				strategy: 'email_code',
			});

			toast.success(`An otp has been sent to ${values.email}`);
			setVerifying(true);
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				toast.error(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	}

	async function onCodeSubmit(values: z.infer<typeof codeFormSchema>) {
		setIsLoading(true);

		if (!isLoaded) return;

		try {
			const signUpAttempt = await signUp?.attemptEmailAddressVerification({
				code: values.code,
			});

			if (signUpAttempt?.status === 'complete') {
				await setActive({
					session: signUpAttempt?.createdSessionId,
					navigate: async ({ session }) => {
						if (session?.currentTask) {
							console.log(session?.currentTask);
							return;
						}

						router.refresh();
					},
				});
			} else {
				console.error('Sign-up attempt not complete:', signUpAttempt);
				console.error('Sign-up attempt status:', signUpAttempt?.status);
			}
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
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
			<div className={cn(verifying && 'hidden')}>
				<h1 className='text-preset-1 font-bold'>Sign Up</h1>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-200 mt-400'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
									<FormLabel>Create Password</FormLabel>
									<FormControl>
										<Input {...field} type='password' />
									</FormControl>
									<FormMessage />
									<FormDescription className='text-right'>
										Passwords must be at least 8 characters
									</FormDescription>
								</FormItem>
							)}
						/>

						<Button className='w-full mt-200' disabled={isLoading}>
							{isLoading && <Spinner />}
							<span>Continue</span>
						</Button>
					</form>
				</Form>
			</div>

			<div className={cn(!verifying && 'hidden')}>
				<h1 className='text-preset-1 font-bold'>Verify Email</h1>
				<Form {...codeForm}>
					<form
						onSubmit={codeForm.handleSubmit(onCodeSubmit)}
						className='mt-4 space-y-6'>
						<FormField
							control={codeForm.control}
							name='code'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<InputOTP
											maxLength={6}
											value={field.value}
											onChange={field.onChange}
											onBlur={field.onBlur}
											name={field.name}
											className='w-full'>
											<InputOTPGroup className='w-full'>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className='w-full' disabled={isLoading}>
							{isLoading && <Spinner />}
							<span>Create Account</span>
						</Button>
					</form>
				</Form>
			</div>

			<p className='text-center mt-400 text-preset-4 text-grey-500'>
				Already have an account?
				<Link href='/sign-in' className='font-bold underline text-grey-900'>
					Login
				</Link>
			</p>
		</div>
	);
};

export default SignUp;
