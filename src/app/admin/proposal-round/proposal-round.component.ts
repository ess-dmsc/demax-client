import { Component, OnInit } from '@angular/core';
import { MessageComponent } from "../../shared/message/message.component";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProposalRound } from "../../models/proposal-round";
import { ProposalService } from "../../proposal/proposal.service";

@Component({
	selector: 'app-proposal-round',
	templateUrl: './proposal-round.component.html',
	styleUrls: [ './proposal-round.component.css' ]
})
export class ProposalRoundComponent implements OnInit {

	isLoading = true;
	isEditing = false;
	isCreating = false;
	isBrowsing = true;

	proposalRound = new ProposalRound();
	proposalRounds: ProposalRound[] = [];

	displayedColumns: string[] = [ 'year', 'cycleId', 'active', 'submission', 'review', 'notifyUsers',  'proposalRoundId', 'edit' ];

	editProposalRoundForm: FormGroup;

	constructor(private proposalService: ProposalService, private formBuilder: FormBuilder, public message: MessageComponent) {
	}

	ngOnInit() {
		this.getProposalRounds();
		this.isBrowsing = true;

		this.editProposalRoundForm = this.formBuilder.group({
			submission: this.formBuilder.group({
				startDate: [ '' ],
				endDate: [ '' ]
			}),
			review: this.formBuilder.group({
				startDate: [ '' ],
				endDate: [ '' ]
			}),
			notifyUsers: this.formBuilder.group({
				startDate: [ '' ],
				endDate: [ '' ]
			}),
			runCycle: [ '' ],
			wrapUpAndUserSurvey: [ '' ],
			proposalRoundId: [ '' ],
			year: [ '' ],
			cycleId: [ '' ]
		})
	}

	enableCreating(){
		this.isBrowsing = false;
		this.isCreating = true;
	}

	enableEditing(proposalRound: ProposalRound) {
		this.isBrowsing = false;
		this.isEditing = true;
		this.proposalRound = proposalRound;
	}

	cancelCreating() {
		this.isCreating = false;
		this.isBrowsing = true;
	}

	cancelEditing() {
		this.isEditing = false;
		this.proposalRound = new ProposalRound();
		this.isBrowsing = true;
		this.message.setMessage('editing cancelled.', 'danger');
		// reload the cats to reset the editing
		this.getProposalRounds();
	}


	getProposalRounds() {
		this.isLoading = true;
		this.proposalService.adminGetProposalRounds().subscribe(
			response => {
				this.proposalRounds = response;
				console.log(this.proposalRounds);
				this.isLoading = false;
			},
			error => {
				console.log(error);
				this.isLoading = false;
				this.message.setMessage('Error fetching proposals. ' + error.message, 'danger')
			}
		)
	}

	editProposalRound(proposalRound: ProposalRound) {
		this.proposalService.adminEditProposalRound(proposalRound).subscribe(
			() => {
				this.isEditing = false;
				this.isBrowsing = true;
				this.proposalRound = proposalRound;
				this.message.setMessage('Proposal round edited successfully.', 'success');
			},
			error => {
				console.log(error);
				this.message.setMessage(error.error, 'danger');
			}
		);
	}

	addProposalRound() {
		this.proposalService.adminAddProposalRound(this.editProposalRoundForm.value).subscribe(
			response => {
				this.isCreating = false;
				this.isBrowsing = true;
				this.getProposalRounds();
				this.message.setMessage('Created new proposal round', 'success')
			}, error => {
				console.log(error);
				this.message.setMessage(error.error, 'danger');
			}
		)
	}
}
