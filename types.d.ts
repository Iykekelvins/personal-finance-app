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
	userClerkId?: string;
	createdAt: Date;
};
