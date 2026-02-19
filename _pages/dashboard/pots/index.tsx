import PotList from './pot-list';
import AddPot from './add-pot';

const Pots = () => {
	return (
		<div
			className='px-200 py-300 md:px-500 md:py-400 des:px-500 space-y-400 pb-20
		md:pb-30'>
			<AddPot />
			<PotList />
		</div>
	);
};

export default Pots;
