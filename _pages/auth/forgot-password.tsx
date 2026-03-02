'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth, useSignIn } from '@clerk/nextjs';
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { z } from 'zod';

const forgotPasswordFormSchema = z.object({
	email: z.email(),
});

const codeFormSchema = z.object({
	code: z.string().min(6, "Can't be empty"),
	newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

const ForgotPassword = () => {
	const router = useRouter();

	const { isSignedIn } = useAuth();
	const { isLoaded, signIn, setActive } = useSignIn();

	const [verifying, setVerifying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
		resolver: zodResolver(forgotPasswordFormSchema),
		defaultValues: {
			email: '',
		},
	});

	const codeForm = useForm<z.infer<typeof codeFormSchema>>({
		resolver: zodResolver(codeFormSchema),
		defaultValues: {
			code: '',
			newPassword: '',
		},
	});

	async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
		if (!isLoaded) return;

		await signIn
			?.create({
				strategy: 'reset_password_email_code',
				identifier: values.email,
			})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.then((_) => {
				setVerifying(true);
				toast.success(`An otp has been sent to ${values.email}`);
			})
			.catch((err) => {
				if (isClerkAPIResponseError(err)) {
					toast.error(err.message);
				}
			});
	}

	async function onCodeSubmit(values: z.infer<typeof codeFormSchema>) {
		setIsLoading(true);

		await signIn
			?.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code: values.code,
				password: values.newPassword,
			})
			.then((result) => {
				if (result.status === 'complete') {
					setActive({
						session: result.createdSessionId,
						navigate: async ({ session }) => {
							if (session?.currentTask) return;
							toast.success('Password reset successful');
							router.push('/');
							setIsLoading(false);
						},
					});
				}
			})
			.catch((err) => {
				if (isClerkAPIResponseError(err)) {
					toast.error(err.message);
				}
				setIsLoading(false);
			});
	}

	useEffect(() => {
		if (isSignedIn) router.push('/');
	}, [isSignedIn, router]);

	return (
		<div
			className='w-140 bg-white rounded-150 
      py-300 px-250 md:p-400'>
			<div className={cn(verifying && 'hidden')}>
				<h1 className='text-preset-1 font-bold'>Forgot Password</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 space-y-6'>
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
						<Button className='w-full mt-200' disabled={form.formState.isSubmitting}>
							{form.formState.isSubmitting && <Spinner />}
							<span>Continue</span>
						</Button>
					</form>
				</Form>
			</div>

			<div className={cn(!verifying && 'hidden')}>
				<h1 className='text-preset-1 font-bold'>Reset Password</h1>
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
						<FormField
							control={codeForm.control}
							name='newPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
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
						<Button className='w-full' disabled={isLoading}>
							{isLoading && <Spinner />}
							<span>Reset</span>
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default ForgotPassword;
