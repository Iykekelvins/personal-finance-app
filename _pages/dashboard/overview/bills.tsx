import SeeDetails from '@/components/see-details';
import { formatAmount } from '@/lib/utils';

export default function Bills({
	bill_summary,
}: {
	bill_summary: {
		paid: number;
		upcoming: number;
		due: number;
	};
}) {
	return (
		<div className='bg-white rounded-150 py-300 px-250 sm:p-400'>
			<div className='flex items-center justify-between'>
				<h2 className='text-preset-2 font-bold'>Recurring Bills</h2>
				<SeeDetails href='/recurring-bills' />
			</div>

			<div className='mt-400 space-y-150'>
				<div
					className='py-250 px-200 bg-beige-100 rounded-100
        border-l-4 border-green border-solid flex items-center
        justify-between
        '>
					<p className='text-grey-500 text-preset-4'>Paid Bills</p>
					<p className='text-preset-4 font-bold'>
						${formatAmount(bill_summary.paid)}
					</p>
				</div>
				<div
					className='py-250 px-200 bg-beige-100 rounded-100
        border-l-4 border-yellow border-solid flex items-center
        justify-between
        '>
					<p className='text-grey-500 text-preset-4'>Total Upcoming</p>
					<p className='text-preset-4 font-bold'>
						${formatAmount(bill_summary.upcoming)}
					</p>
				</div>
				<div
					className='py-250 px-200 bg-beige-100 rounded-100
        border-l-4 border-cyan border-solid flex items-center
        justify-between
        '>
					<p className='text-grey-500 text-preset-4'>Due Soon</p>
					<p className='text-preset-4 font-bold'>
						${formatAmount(bill_summary.due)}
					</p>
				</div>
			</div>
		</div>
	);
}
