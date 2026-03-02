import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';
import { metaDataOptions } from '@/lib/metadata';

import './globals.css';

const publicSans = Public_Sans({
	variable: '--font-public-sans',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: {
		default: 'Overview - Finance',
		template: '%s - Finance',
	},
	metadataBase: new URL('https://finance.iykekelvins.dev'),
	description:
		'Track spending, manage budgets, and grow your savings—all in one place.',
	...metaDataOptions,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${publicSans.variable}  antialiased`}>
					{children}
					<Toaster position='top-center' theme='dark' richColors />
				</body>
			</html>
		</ClerkProvider>
	);
}
