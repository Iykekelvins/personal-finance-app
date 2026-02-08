import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeClosed } from 'lucide-react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<div className='relative flex items-center'>
			<input
				type={type === 'password' && showPassword ? 'text' : type}
				data-slot='input'
				className={cn(
					'file:text-foreground placeholder:text-beige-500 selection:bg-primary selection:text-primary-foreground',
					'dark:bg-input/30 border-input h-11.25 w-full min-w-0 rounded-md border border-beige-500 bg-transparent',
					'px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7',
					'file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none',
					'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] ',
					'aria-invalid:ring-red/20 dark:aria-invalid:ring-red/40 aria-invalid:border-red',
					className,
				)}
				{...props}
			/>
			{type === 'password' && (
				<button
					type='button'
					className='absolute right-4'
					onClick={() => setShowPassword(!showPassword)}>
					{!showPassword ? (
						<Eye size={16} color='#252623' />
					) : (
						<EyeClosed size={16} color='#252623' />
					)}
				</button>
			)}
		</div>
	);
}

export { Input };
