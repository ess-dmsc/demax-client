export class Proposal {
	_id?: string;
	experiment_title: string;
	brief_summary: string;
	proposer: {
		role: string;
		firstname: string;
		lastname: string;
		email: string;
		phone: string;
		industry: string;
		employer?: string;
	};
	need_by_date?: string;
	motivation?: string;
	attachment?: string;
	facility?: string;
	deuteration_methods?: {
		crystallization?: boolean;
		biomass?: boolean;
		protein?: boolean;
		chemical?: boolean;
	};
}
