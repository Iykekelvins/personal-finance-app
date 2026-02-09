import RecurringBills from '@/_pages/dashboard/recurring-bills';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Recurring Bills',
};

const RecurringBillspage = () => {
	return <RecurringBills />;
};

export default RecurringBillspage;
