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
			md:pb-30'>
			<div className='flex items-center justify-between'>
				<h1 className='text-preset-1 font-bold'>Recurring Bills</h1>
				<AddBill />
			</div>

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
		</div>
	);
};

export default RecurringBills;
