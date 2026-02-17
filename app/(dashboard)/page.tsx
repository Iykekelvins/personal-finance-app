import { currentUser } from '@clerk/nextjs/server';
import { getOverview } from '@/actions/overview';

import connectDB from '@/lib/db';
import User from '@/models/users';
import Overview from '@/_pages/dashboard/overview';

export default async function Home() {
	await connectDB();

	const user = await currentUser();

	let dbUser = await User.findOne({ clerkId: user?.id }).lean();

	if (!dbUser) {
		const newUser = await User.create({
			fullName: user?.firstName || '',
			email: user?.emailAddresses[0].emailAddress || '',
			clerkId: user?.id,
		});

		dbUser = newUser.toObject();
	}

	const overview = await getOverview();

	return <Overview overview={JSON.parse(JSON.stringify(overview))} />;
}
