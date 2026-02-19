type OverviewData = {
	data: {
		wallet: {
			balance: number;
			expenses: number;
		};
		pots: {
			totalSaved: number;
			pot_list: PotProps[];
		};
		transactions: TransactionProps[];
		budgets: {
			totalSpent: number;
			totalLimit: number;
			budget_list: BudgetProps[];
		};
	};
};

type PotProps = {
	name: string;
	target: number;
	theme: string;
	_id?: string;
	total?: number;
	userClerkId?: string;
};

type BudgetProps = {
	category: string;
	maximum: number;
	theme: string;
	_id?: string;
	spent?: number;
	userClerkId?: string;
};

type TransactionProps = {
	_id: string;
	name: string;
	category: string;
	avatar: string;
	amount: number;
	userClerkId: string;
	createdAt: Date;
};

type Pagination = {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
};

type TransactionsData = {
	transactions: TransactionProps[];
	pagination: Pagination;
};

type BillProps = {
	userClerkId: string;
	title: string;
	avatar: string;
	amount: number;
	dayOfMonth: number;
	status: string;
};

type BillsData = {
	bills: BillProps[];
	total_bills: number;
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
};

type SortOption = 'latest' | 'oldest' | 'a_to_z' | 'z_to_a' | 'highest' | 'lowest';
