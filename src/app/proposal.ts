export class Proposal {
	_id?: string;
	experimentTitle?: string;
	briefSummary?: string;
	mainProposer?: string;
	phone?: {
		work: string;
		mobile: string;
	};
	coProposers?: [
		{
			coProposers?: string
		}
		];
	needByDate?: {
		motivation?: string;
		attachment?: string;
	};
	resources?: {
		lab?: string;
		instrument?: string;
		service?: string
	};
	dateCreated?: string;
}