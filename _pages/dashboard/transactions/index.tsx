import Table from './table';

const Transactions = ({
	transactionsData,
	currentPage,
	currentSort,
	currentSearch,
	currentCategory,
}: {
	currentPage: number;
	transactionsData: TransactionsData;
	currentSort: string;
	currentSearch: string;
	currentCategory: string;
}) => {
	return (
		<div
			className='px-200 py-300 md:px-500 md:py-400 des:px-500 space-y-400 pb-20
			md:pb-30
		'>
			<h1 className='text-preset-1 leading-[1.2] font-bold'>Transactions</h1>

			<div className='bg-white rounded-150 py-300 px-250 md:p-400 mt-400'>
				<Table
					transactionsData={transactionsData}
					currentPage={currentPage!}
					currentCategory={currentCategory!}
					currentSearch={currentSearch!}
					currentSort={currentSort!}
				/>
			</div>
		</div>
	);
};

export default Transactions;
