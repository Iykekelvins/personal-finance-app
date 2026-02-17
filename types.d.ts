type PotProps = {
	name: string;
	target: number;
	theme: string;
	_id?: string;
	total?: number;
	userClerkId?: string;
};

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
	};
};
