import Budgets from '@/_pages/dashboard/budgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Budgets',
};

const Budgetspage = () => {
	return <Budgets />;
};

export default Budgetspage;
