export class ProposalRound {
	submission: {
		startDate: string;
		endDate: string;
	};
	review: {
		startDate: string;
		endDate: string;
	};
	notifyUsers: {
		startDate: string;
		endDate: string;
	};
	runCycle: string;
	wrapUpAndUserSurvey: string;
	proposalRoundId: string;
	year: number;
	cycleId: string;
}