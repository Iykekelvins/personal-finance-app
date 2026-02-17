export default function Cards({
	wallet,
}: {
	wallet: {
		balance: number;
		expenses: number;
	};
}) {
	return (
		<div className='mt-400 grid md:grid-cols-2 gap-150 md:gap-300'>
			<div className='bg-grey-900 rounded-150 p-300 text-white'>
				<h2 className='text-preset-4'>Current Balance</h2>
				<p className='text-preset-1 font-bold leading-[1.2] mt-150'>
					${wallet.balance.toLocaleString()}
				</p>
			</div>

			<div className='bg-white rounded-150 p-300'>
				<h2 className='text-preset-4 text-grey-500'>Expenses</h2>
				<p className='text-preset-1 text-grey-900 font-bold leading-[1.2] mt-150'>
					${wallet.expenses.toLocaleString()}
				</p>
			</div>
		</div>
	);
}
