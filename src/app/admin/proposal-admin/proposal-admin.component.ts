import { Component, OnInit } from '@angular/core';
import { ProposalService } from "../../proposal/proposal.service";
import { Proposal } from "../../models/proposal";

@Component({
  selector: 'app-proposal-admin',
  templateUrl: './proposal-admin.component.html',
  styleUrls: [ './proposal-admin.component.css']
})
export class ProposalAdminComponent implements OnInit {

	proposals: Proposal[] = [];

	isLoading = true;
	displayedProposalColumns: string[] = [ 'proposalId', 'experimentTitle', 'options' ]

	constructor(private proposalService: ProposalService) { }

  ngOnInit() {
	  this.getProposals();
  }

	getProposals() {
		this.proposalService.adminGetProposals().subscribe(
			data => this.proposals = data,
			error => console.log(error),
			() => this.isLoading = false
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
