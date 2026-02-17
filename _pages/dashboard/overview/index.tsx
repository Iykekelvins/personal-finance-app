import Cards from './cards';
import Pots from './pots';

const Overview = ({ overview }: { overview: OverviewData }) => {
	return (
		<div className='px-200 py-300 md:px-500 md:py-400 des:px-500 space-y-400 pb-20'>
			<h1 className='text-preset-1 font-bold leading-[1.2]'>Overview</h1>

			<Cards wallet={overview.data.wallet} />
			<div className='grid des:grid-cols-2 gap-300'>
				<div className='space-y-300'>
					<Pots pots={overview.data.pots} />
				</div>
			</div>
		</div>
	);
};

export default Overview;
