import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProposalService } from '../services/proposal.service';
import { Proposal } from '../models/proposal';
import { AuthService } from "../services/auth.service";

import { AppConfig } from "../app-config.module";
import { APP_CONFIG } from "../app-config.module";
import { MessageComponent } from "../message/message.component";


@Component({
	selector: 'app-proposals',
	templateUrl: './proposals.component.html',
	styleUrls: [ './proposals.component.css' ],
	providers: [ ProposalService ]
})
export class ProposalsComponent implements OnInit {
	url = this.appConfig.demaxBaseUrl;
	displayedColumns: string[] = [ 'proposalId', 'experimentTitle', 'mainProposer', 'options' ];

	proposal = new Proposal();
	proposals: Proposal[] = [];

	isLoading = true;
	isEditing = false;


	selectedIndex = 0;
	experimentTitle = new FormControl('', [
		Validators.required
	]);


	selectTab(index: number): void {
		window.scrollTo(0, 0)
		event.preventDefault();
		this.selectedIndex = index;
	}


	proposalForm = this.formBuilder.group({
		dateCreated: [ '' ],
		experimentTitle: [ '' , Validators.required],
		briefSummary: [ '', Validators.required ],
		mainProposer: this.formBuilder.group({
			firstName: [ '', Validators.required ],
			lastName: [ '', Validators.required ],
			email: [ '', Validators.required ],
			phone: [ '', Validators.required ],
			employer: [ '', Validators.required ],
			sector: [ '', Validators.required ],
			title: [ '', Validators.required ],
		}),
		needByDate: [ '', Validators.required ],
		needByDateMotivation: [ '', Validators.required ],
		needByDateAttachment: [ '', Validators.required ],
		lab: [ '', Validators.required ],
		linksWithIndustry: [ '', Validators.required ],
		linksWithIndustryDetails: [ '' ],
		coProposerStudents: [ '', Validators.required ]
	});

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		public auth: AuthService,
		public message: MessageComponent
	) {
	}

	onSubmit() {
		this.proposalService.addProposal(this.proposalForm.value).subscribe(
			res => {
				this.proposals.push(res);
				this.proposalForm.reset();
				this.message.setMessage('Saved proposal' + this.proposal.proposalId, 'success')
			},
			error => console.log(error)
		);
	}

	ngOnInit() {
		window.scrollTo(0, 0)
		this.getProposals();
		this.proposalForm = this.formBuilder.group({})
	}

	getProposals() {
		window.scrollTo(0, 0)
		this.proposalService.getProposals(this.auth.currentUser).subscribe(
			data => this.proposals = data,
			error => console.log(error),
		);

	}

	enableEditing(proposal: Proposal) {
		window.scrollTo(0, 0)
		this.isEditing = true;
		this.proposal = proposal;
		this.message.setMessage('Editing proposal ' + this.proposal.proposalId, 'success')
	}

	cancelEditing() {
		window.scrollTo(0, 0)
		this.isEditing = false;
		this.message.setMessage('Cancelled', 'danger')

		this.proposal = new Proposal();
		this.getProposals();
	}

	editProposal(proposal: Proposal) {
		window.scrollTo(0, 0)
		this.proposalService.editProposal(proposal).subscribe(
			() => {
				this.isEditing = false;
				this.proposal = proposal;
				this.message.setMessage('Saved ' + this.proposal.proposalId, 'success')
			},
			error => console.log(error)
		);
	}


	deleteProposal(proposal: Proposal) {
		window.scrollTo(0, 0)
		if(window.confirm('Are you sure you want to permanently delete this proposal?')) {
			this.proposalService.deleteProposal(proposal).subscribe(
				() => {
					const pos = this.proposals.map(element => element.proposalId).indexOf(proposal.proposalId);
					this.message.setMessage('Deleted proposal ' + this.proposal.proposalId, 'danger')
					this.proposals.splice(pos, 1);
					this.getProposals();

				},
				error => console.log(error)
			);
		}
	}
}
