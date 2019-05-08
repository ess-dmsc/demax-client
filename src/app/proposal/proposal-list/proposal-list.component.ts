import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProposalService } from '../proposal.service';
import { Proposal } from '../../models/proposal';
import { AuthService } from "../../user/auth.service";
import { AppConfig } from "../../app-config.module";
import { APP_CONFIG } from "../../app-config.module";
import { MessageComponent } from "../../shared/message/message.component";
import { Router } from "@angular/router";


@Component({
	selector: 'app-proposal-list',
	templateUrl: './proposal-list.component.html',
	styleUrls: [ './proposal-list.component.css' ]
})
export class ProposalListComponent implements OnInit {
	url = this.appConfig.demaxBaseUrl;
	displayedColumns: string[] = [ 'proposalId', 'experimentTitle', 'mainProposer', 'submitted', 'options' ];

	proposal = new Proposal();
	proposals: Proposal[] = [];
	isLoading = true;
	proposalForm: FormGroup;

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		private proposalService: ProposalService,
		public auth: AuthService,
		public router: Router,
		public message: MessageComponent
	) {
	}

	ngOnInit() {
		window.scrollTo(0, 0)
		this.getProposals();
	}

	getProposals() {
		this.isLoading = true;
		window.scrollTo(0, 0)
		this.proposalService.getProposals(this.auth.currentUser).subscribe(
			data => {
				this.proposals = data;
				this.isLoading = false;
			},
			error => console.log(error),
		);

	}

	deleteProposal(proposal: Proposal) {
		this.isLoading = true;
		this.proposal = proposal;
		window.scrollTo(0, 0)
		console.log(this.proposal.proposalId)
		if(window.confirm('Are you sure you want to permanently delete this proposal?')) {
			this.proposalService.deleteProposal(proposal).subscribe(
				() => {
					this.getProposals();
					this.message.setMessage('Deleted proposal ' + this.proposal.proposalId, 'danger')

				},
				error => console.log(error)
			);
		}
	}
}
