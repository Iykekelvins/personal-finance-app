import NewBudget from '@/components/modals/new-budget';

const Budgets = () => {
	return (
		<div className='py-400 px-500'>
			<div className='flex items-center justify-between'>
				<h1 className='text-preset-2 md:text-preset-1 font-bold'>Budgets</h1>
				<NewBudget />
			</div>
		</div>
	);
};

export default Budgets;
