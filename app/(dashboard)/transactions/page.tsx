import Transactions from '@/_pages/dashboard/transactions';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Transactions',
};

const Transactionspage = () => {
	return <Transactions />;
};

export default Transactionspage;
