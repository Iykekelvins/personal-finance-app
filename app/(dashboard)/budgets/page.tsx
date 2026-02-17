import { Metadata } from 'next';

import Budgets from '@/_pages/dashboard/budgets';

export const metadata: Metadata = {
	title: 'Budgets',
};

const Budgetspage = () => {
	return <Budgets />;
};

export default Budgetspage;
