import Transactions from '@/_pages/dashboard/transactions';
import getTransactions from '@/actions/transactions';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Transactions',
};

type SortOption = 'latest' | 'oldest' | 'a_to_z' | 'z_to_a' | 'highest' | 'lowest';

interface TransactionsPageProps {
	searchParams: Promise<{
		sort?: SortOption;
		category?: string;
		search?: string;
		page?: number;
	}>;
}

const Transactionspage = async ({ searchParams }: TransactionsPageProps) => {
	const params = await searchParams;
	const page = Number(params.page) || 1;
	const sort = params.sort;
	const search = params.search;
	const category = params.category;

	const transactionsData = (await getTransactions({
		page,
		sort,
		category,
		search,
	})) as TransactionsData;

	return <Transactions transactionsData={transactionsData} />;
};

export default Transactionspage;
