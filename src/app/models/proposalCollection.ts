export class proposalCollection{
	proposalId: string;
	cycle: string;
	getMainProposers(proposalId){
		return this.proposalId
	};
	getCycle(){
		return this.cycle;
	}
	mainProposer:{
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	}
	coProposers: [
		{
			firstName: string;
			lastName: string;
			email: string;
			phone: string;
		}
		];
	attachments: [
		{
			fileName: string;
			encoding: string;
			fileSize: string;
			attachmentType: string;
			attachmentName: string;
			dateCreated: string;
		}
		]
}