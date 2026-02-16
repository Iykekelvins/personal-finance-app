import PotList from './pot-list';
import AddPot from './add-pot';

const Pots = () => {
	return (
		<div className='py-400 px-500'>
			<AddPot />
			<PotList />
		</div>
	);
};

export default Pots;
