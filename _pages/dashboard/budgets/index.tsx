import AddBudget from './add-budget';
import BudgetList from './budget-list';

const Budgets = () => {
	return (
		<div
			className='px-200 py-300 md:px-500 md:py-400 des:px-500 space-y-400 pb-20
		md:pb-30'>
			<AddBudget />
			<BudgetList />
		</div>
	);
};

export default Budgets;
