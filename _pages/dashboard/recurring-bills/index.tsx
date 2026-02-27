import AddBill from './add-bill';
import Summary from './summary';
import Table from './table';
import TotalBills from './total-bills';

const RecurringBills = ({
	billsData,
	currentSort,
	currentSearch,
}: {
	billsData: BillsData;
	currentSort: string;
	currentSearch: string;
}) => {
	return (
		<div
			className='px-200 py-300 md:px-500 md:py-400 des:px-500 space-y-400 pb-20
			md:pb-30 flex flex-col flex-1'>
			<div className='flex items-center justify-between'>
				<h1 className='text-preset-1 font-bold'>Recurring Bills</h1>
				<AddBill />
			</div>

			{billsData.bills.length === 0 ? (
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

						<rect
							x='35'
							y='40'
							width='50'
							height='45'
							rx='4'
							fill='white'
							stroke='#D1D1D1'
							strokeWidth='2'
						/>

						<rect
							x='35'
							y='40'
							width='50'
							height='12'
							rx='4'
							fill='#C94736'
							opacity='0.9'
						/>
						<rect x='35' y='48' width='50' height='4' fill='#C94736' opacity='0.9' />

						<circle cx='45' cy='38' r='3' fill='#D1D1D1' />
						<circle cx='60' cy='38' r='3' fill='#D1D1D1' />
						<circle cx='75' cy='38' r='3' fill='#D1D1D1' />

						<circle cx='43' cy='60' r='2' fill='#E5E5E5' />
						<circle cx='52' cy='60' r='2' fill='#E5E5E5' />
						<circle cx='61' cy='60' r='2' fill='#E5E5E5' />
						<circle cx='70' cy='60' r='2' fill='#E5E5E5' />
						<circle cx='77' cy='60' r='2' fill='#E5E5E5' />

						<circle cx='43' cy='68' r='2' fill='#E5E5E5' />
						<circle cx='52' cy='68' r='2' fill='#E5E5E5' />
						<circle cx='61' cy='68' r='2' fill='#E5E5E5' />
						<circle cx='70' cy='68' r='2' fill='#E5E5E5' />
						<circle cx='77' cy='68' r='2' fill='#E5E5E5' />

						<circle cx='43' cy='76' r='2' fill='#E5E5E5' />
						<circle cx='52' cy='76' r='2' fill='#E5E5E5' />

						<circle cx='61' cy='76' r='4' fill='#C94736' opacity='0.3' />
						<circle cx='61' cy='76' r='2' fill='#C94736' />

						<path
							d='M 88 65 A 8 8 0 1 1 88 75'
							stroke='#C94736'
							strokeWidth='2'
							fill='none'
							strokeLinecap='round'
						/>
						<path d='M 88 65 L 90 68 L 86 68 Z' fill='#C94736' />
					</svg>
					<p className='text-preset-2 font-bold text-center'>
						You don&apos;t have any recurring bills.
					</p>
				</div>
			) : (
				<div className='flex flex-col lg:flex-row items-start justify-between gap-300'>
					<div
						className='des:max-w-84.25 w-full grid grid-cols-2 des:grid-cols-1
					gap-300
					'>
						<TotalBills total={billsData.total_bills} />
						<Summary bill_summary={billsData.bill_summary} />
					</div>

					<Table
						bills={billsData.bills}
						currentSearch={currentSearch}
						currentSort={currentSort}
					/>
				</div>
			)}
		</div>
	);
};

export default RecurringBills;
