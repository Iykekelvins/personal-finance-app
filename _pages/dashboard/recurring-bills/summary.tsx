import { formatAmount } from '@/lib/utils';

export default function Summary({
	bill_summary,
}: {
	bill_summary: {
		paid: {
			total: number;
			amount: number;
		};
		upcoming: {
			total: number;
			amount: number;
		};
		due: {
			total: number;
			amount: number;
		};
	};
}) {
	return (
		<div className='bg-white rounded-150 p-250 space-y-250'>
			<h2 className='text-preset-3 font-bold'>Summary</h2>
			<div className='space-y-200 text-preset-5'>
				<div
					className='flex items-center justify-between
					border-b border-b-[#69686826] border-solid pb-200
					'>
					<p className='text-grey-500'>Paid Bills</p>
					<p className='font-bold'>
						{bill_summary.paid.total} (${formatAmount(bill_summary.paid.amount)})
					</p>
				</div>

				<div
					className='flex items-center justify-between
					border-b border-b-[#69686826] border-solid pb-200
					'>
					<p className='text-grey-500'>Total Upcoming</p>
					<p className='font-bold'>
						{bill_summary.upcoming.total} ($
						{formatAmount(bill_summary.upcoming.amount)})
					</p>
				</div>

				<div
					className='flex items-center justify-between text-red
					'>
					<p className='text-grey-500'>Due Soon</p>
					<p className='font-bold'>
						{bill_summary.due.total} ($
						{formatAmount(bill_summary.due.amount)})
					</p>
				</div>
			</div>
		</div>
	);
}
