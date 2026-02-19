import RecurringBills from '@/_pages/dashboard/recurring-bills';
import { getBills } from '@/actions/bills';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Recurring Bills',
};

interface BillsPageProps {
	searchParams: Promise<{
		sort?: SortOption;
		search?: string;
	}>;
}

const RecurringBillspage = async ({ searchParams }: BillsPageProps) => {
	const params = await searchParams;
	const currentSort = params.sort;
	const currentSearch = params.search;

	const billsData = (await getBills({
		search: currentSearch,
		sort: currentSort,
	})) as BillsData;

	return <RecurringBills billsData={billsData} />;
};

export default RecurringBillspage;
