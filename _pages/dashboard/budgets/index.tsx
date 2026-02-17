import AddBudget from './add-budget';
import BudgetList from './budget-list';

const Budgets = () => {
	return (
		<div className='py-400 px-500'>
			<AddBudget />
			<BudgetList />
		</div>
	);
};

export default Budgets;
