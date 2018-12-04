import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { AuthService } from "../services/auth.service";

@Component({
	selector: 'app-proposal-list',
	templateUrl: './proposal-list.component.html',
	styleUrls: [ './proposal-list.component.css' ]
})
export class ProposalListComponent implements OnInit {
	proposal = new Proposal();
	proposals: Proposal[] = [];
	isEditing = false;

	addProposalForm: FormGroup;
	experimentTitle = new FormControl('');
	briefSummary = new FormControl('');
	mainProposerFirstName = new FormControl('');
	mainProposerLastName = new FormControl('');
	mainProposerAffiliation = new FormControl('');
	mainProposerEmail = new FormControl('');
	mainProposerPhone = new FormControl('');
	needByDate = new FormControl('');
	needByDateMotivation = new FormControl('');
	needByDateAttachment = new FormControl('');
	lab = new FormControl('');

	constructor(
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		private http: HttpClient,
		public auth: AuthService
	) {
	}

	ngOnInit() {
		this.getProposals();
	}

	enableEditing(proposal: Proposal) {
		this.isEditing = true;
		this.proposal = proposal;
	}

	getProposals() {
		this.proposalService.getProposals().subscribe(
			data => this.proposals = data,
			error => console.log(error),
		);
	}

	deleteProposal(proposal: Proposal
	) {
		if(window.confirm('Are you sure you want to permanently delete this proposal?')) {
			this.proposalService.deleteProposal(proposal).subscribe(
				() => {
					const pos = this.proposals.map(element => element._id).indexOf(proposal._id);
					this.proposals.splice(pos, 1);
				},
				error => console.log(error)
			);
		}
	}

}
