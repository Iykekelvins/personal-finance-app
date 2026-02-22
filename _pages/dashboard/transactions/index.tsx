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
			md:pb-30 flex flex-col flex-1
		'>
			<h1 className='text-preset-1 leading-[1.2] font-bold'>Transactions</h1>

			{transactionsData.transactions.length === 0 ? (
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
							y='30'
							width='50'
							height='60'
							rx='3'
							fill='white'
							stroke='#D1D1D1'
							strokeWidth='2'
						/>

						<path
							d='M 35 35 L 38 32 L 41 35 L 44 32 L 47 35 L 50 32 L 53 35 L 56 32 L 59 35 L 62 32 L 65 35 L 68 32 L 71 35 L 74 32 L 77 35 L 80 32 L 83 35 L 85 35'
							stroke='#D1D1D1'
							strokeWidth='2'
							fill='none'
						/>

						<line
							x1='42'
							y1='45'
							x2='78'
							y2='45'
							stroke='#E5E5E5'
							strokeWidth='3'
							strokeLinecap='round'
						/>
						<line
							x1='42'
							y1='53'
							x2='68'
							y2='53'
							stroke='#E5E5E5'
							strokeWidth='3'
							strokeLinecap='round'
						/>
						<line
							x1='42'
							y1='61'
							x2='75'
							y2='61'
							stroke='#E5E5E5'
							strokeWidth='3'
							strokeLinecap='round'
						/>

						<line
							x1='42'
							y1='69'
							x2='78'
							y2='69'
							stroke='#C94736'
							strokeWidth='3'
							strokeLinecap='round'
							opacity='0.7'
						/>

						<text
							x='75'
							y='80'
							text-anchor='end'
							font-family='Arial, sans-serif'
							font-size='12'
							fontWeight='bold'
							fill='#C94736'>
							$0.00
						</text>

						<circle cx='88' cy='38' r='4' fill='#C94736' />
					</svg>
					<p className='text-preset-2 font-bold text-center'>
						You don&apos;t have any transactions.
					</p>
				</div>
			) : (
				<div className='bgWhite rounded-150 py-300 px-250 md:p-400'>
					<Table
						transactionsData={transactionsData}
						currentPage={currentPage!}
						currentCategory={currentCategory!}
						currentSearch={currentSearch!}
						currentSort={currentSort!}
					/>
				</div>
			)}
		</div>
	);
};

export default Transactions;
