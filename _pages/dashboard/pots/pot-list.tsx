import { auth } from '@clerk/nextjs/server';

import Pot from '@/models/pots';
import PotComp from './pot';

export default async function PotList() {
	const { userId } = await auth();
	const pots = await Pot.find({ userClerkId: userId });

	return (
		<ul className='mt-200 grid des:grid-cols-2 gap-300'>
			{pots?.map((pot) => (
				<PotComp key={pot._id} {...pot.toObject()} />
			))}
		</ul>
	);
}
