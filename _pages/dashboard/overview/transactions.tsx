import { cn, formatAmount, formatDate } from '@/lib/utils';

import SeeDetails from '@/components/see-details';
import Image from 'next/image';

export default function Transactions({
	transactions,
}: {
	transactions: TransactionProps[];
}) {
	return (
		<div className='bg-white rounded-150 py-300 px-250 sm:p-400'>
			<div className='flex items-center justify-between'>
				<h2 className='text-preset-2 font-bold'>Transactions</h2>
				<SeeDetails href='/transactions' />
			</div>

			{transactions.length === 0 ? (
				<p className='text-preset-3 text-center py-250'>
					You don&apos;t have any transactions
				</p>
			) : (
				<ul className='mt-400 space-y-150'>
					{transactions.map((transaction, i) => (
						<li
							key={transaction._id}
							className={cn(
								'pb-150 flex items-center justify-between',
								i !== transactions.length - 1 &&
									'border-b border-b-grey-100 border-solid',
							)}>
							<div className='flex items-center gap-200'>
								<Image
									src={transaction.avatar}
									width={40}
									height={40}
									alt={`Avatar for ${transaction.name}`}
								/>
								<p className='text-preset-4 font-bold leading-normal'>
									{transaction.name}
								</p>
							</div>

							<div className='text-right space-y-100'>
								<p
									className={`text-preset-4 font-bold ${transaction.amount > 0 ? 'text-green' : ''}`}>
									{transaction.amount > 0 ? '+' : '-'}$
									{formatAmount(
										transaction.amount < 0
											? Number(transaction.amount.toLocaleString().slice(1))
											: transaction.amount,
									)}
								</p>
								<p className='text-preset-5 text-grey-500'>
									{formatDate(transaction.createdAt)}
								</p>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
