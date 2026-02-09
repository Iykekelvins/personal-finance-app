import Pots from '@/_pages/dashboard/pots';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Pots',
};

const Potspage = () => {
	return <Pots />;
};

export default Potspage;
