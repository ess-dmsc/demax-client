import { Component, Inject, OnInit } from '@angular/core';
import { ProposalService } from "../../proposal/proposal.service";
import { Proposal } from "../../models/proposal";
import { APP_CONFIG, AppConfig } from "../../app-config.module";

@Component({
	selector: 'app-proposal-admin',
	templateUrl: './proposal-admin.component.html',
	styleUrls: [ './proposal-admin.component.css' ]
})
export class ProposalAdminComponent implements OnInit {

	proposals: Proposal[] = [];
	url = this.appConfig.demaxBaseUrl;
	isEditing = false;
	isEditingMetaData = false;
	isLoading = true;
	displayedProposalColumns: string[] = [ 'proposalId', 'experimentTitle', 'categories', 'dateCreated', 'mainProposer', 'submitted', 'options' ]

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		private proposalService: ProposalService
	) {
	}

	ngOnInit() {
		this.getProposals();
	}

	getProposals() {
		this.proposalService.adminGetProposals().subscribe(
			data => {
				this.proposals = data;
				this.isLoading = false
			},
			error => {
				console.log(error);
				this.isLoading = false
			}
		)
	}


	deleteProposal(proposal: Proposal) {
		if(window.confirm('Are you sure you want to delete ' + proposal.mainProposer.email + '?')) {
			this.proposalService.deleteProposal(proposal).subscribe(
				() => this.getProposals()
			);
		}
	}

}
