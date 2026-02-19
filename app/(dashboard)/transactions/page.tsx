import Transactions from '@/_pages/dashboard/transactions';
import getTransactions from '@/actions/transactions';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Transactions',
};

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
	const currentPage = Number(params.page) || 1;
	const currentSort = params.sort;
	const currentSearch = params.search;
	const currentCategory = params.category;

	const transactionsData = (await getTransactions({
		page: currentPage,
		sort: currentSort,
		category: currentCategory,
		search: currentSearch,
	})) as TransactionsData;

	return (
		<Transactions
			transactionsData={transactionsData}
			currentCategory={currentCategory!}
			currentPage={currentPage!}
			currentSearch={currentSearch!}
			currentSort={currentSort!}
		/>
	);
};

export default Transactionspage;
