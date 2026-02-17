import { auth } from '@clerk/nextjs/server';

import Pot from '@/models/pots';
import PotComp from './pot';
import connectDB from '@/lib/db';

export default async function PotList() {
	const { userId } = await auth();

	await connectDB();

	const pots = await Pot.find({ userClerkId: userId });

	return (
		<ul className='mt-200 grid des:grid-cols-2 gap-300'>
			{pots?.map((pot) => (
				<PotComp key={pot._id} pot={JSON.parse(JSON.stringify(pot))} />
			))}
		</ul>
	);
}
