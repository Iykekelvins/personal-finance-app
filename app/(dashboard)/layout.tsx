import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

import Tabs from '@/components/tabs';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='flex-1'>
				<div className='max-w-7xl mx-auto'>{children}</div>
			</main>
			<Tabs />
		</SidebarProvider>
	);
}
