'use client';

import { Button } from '@/components/ui/button';

export default function Error() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-200'>
			<h1 className='text-preset-1 text-center font-bold'>
				An error occured, please try again later.
			</h1>

			<Button onClick={() => window.location.reload()} className='mt-200'>
				Reload page
			</Button>
		</div>
	);
}
