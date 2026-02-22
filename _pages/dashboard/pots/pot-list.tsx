import { auth } from '@clerk/nextjs/server';

import Pot from '@/models/pots';
import PotComp from './pot';
import connectDB from '@/lib/db';

export default async function PotList() {
	const { userId } = await auth();

	await connectDB();

	const pots = await Pot.find({ userClerkId: userId });

	if (pots.length === 0) {
		return (
			<div
				className='flex flex-col items-center justify-center 
				flex-1 gap-200'>
				<svg
					width='120'
					height='120'
					viewBox='0 0 120 120'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<circle
						cx='60'
						cy='60'
						r='58'
						fill='#F8F4F0'
						stroke='#E5E5E5'
						strokeWidth='2'
					/>

					<ellipse cx='60' cy='75' rx='22' ry='8' fill='#E5E5E5' />
					<rect
						x='38'
						y='45'
						width='44'
						height='30'
						rx='4'
						fill='white'
						stroke='#D1D1D1'
						strokeWidth='2'
					/>

					<rect x='54' y='40' width='12' height='4' rx='1' fill='#C94736' />

					<circle cx='50' cy='30' r='5' fill='#C94736' opacity='0.6' />
					<circle cx='70' cy='28' r='6' fill='#C94736' opacity='0.8' />
					<circle cx='62' cy='25' r='4' fill='#C94736' />

					<text
						x='50'
						y='33'
						textAnchor='middle'
						fontFamily='Arial, sans-serif'
						fontSize='7'
						fontWeight='bold'
						fill='white'>
						$
					</text>
					<text
						x='70'
						y='31'
						textAnchor='middle'
						fontFamily='Arial, sans-serif'
						fontSize='8'
						fontWeight='bold'
						fill='white'>
						$
					</text>
					<text
						x='62'
						y='28'
						textAnchor='middle'
						fontFamily='Arial, sans-serif'
						fontSize='6'
						fontWeight='bold'
						fill='white'>
						$
					</text>

					<rect x='42' y='65' width='36' height='2' rx='1' fill='#E5E5E5' />
					<rect
						x='42'
						y='65'
						width='8'
						height='2'
						rx='1'
						fill='#C94736'
						opacity='0.5'
					/>
				</svg>
				<p className='text-preset-2 font-bold text-center'>
					You don&apos;t have any pots
				</p>
			</div>
		);
	}

	return (
		<ul className='grid des:grid-cols-2 gap-300'>
			{pots?.map((pot) => (
				<PotComp key={pot._id} pot={JSON.parse(JSON.stringify(pot))} />
			))}
		</ul>
	);
}
