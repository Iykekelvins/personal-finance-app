import Cards from './cards';

const Overview = ({ overview }: { overview: OverviewData }) => {
	return (
		<div className='px-200 py-300 md:px-50 md:py-400 des:px-500'>
			<h1 className='text-grey-900 text-preset-1 font-bold leading-[1.2]'>
				Overview
			</h1>

			<Cards wallet={overview.data.wallet} />
		</div>
	);
};

export default Overview;
