import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { AuthService } from "../services/auth.service";
import { TestService } from "../services/test.service";

@Component({
	selector: 'app-proposal',
	templateUrl: './proposal.component.html',
	styleUrls: [ './proposal.component.css' ],
	providers: [ TestService ]
})

export class ProposalComponent implements OnInit {
	proposal = new Proposal();
	message: string;

	constructor(
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		public auth: AuthService,
		private uploaderService: TestService
	) {
	}

	proposalForm = this.formBuilder.group({
		experimentTitle: [ '' ],
		briefSummary: [ '' ],
		mainProposerFirstName: [ '' ],
		mainProposerLastName: [ '' ],
		mainProposerAffiliation: [ '' ],
		mainProposerEmail: [ '' ],
		mainProposerPhone: [ '' ],
		coProposers: this.formBuilder.array([
			this.formBuilder.control('')
		]),
		needByDate: [ '' ],
		needByDateMotivation: [ '' ],
		needByDateAttachment: [ '' ],
		lab: [ '' ]
	});


	ngOnInit() {
	}

	get coProposers() {
		return this.proposalForm.get('coProposers') as FormArray;
	}

	addCoProposer() {
		event.preventDefault();
		this.coProposers.push(this.formBuilder.control(''));
	}

	addProposal() {
		this.proposalService.addProposal(this.proposalForm.value).subscribe(
			error => console.log(error)
		);
	}


	onPicked(input: HTMLInputElement) {
		const file = input.files[ 0 ];
		console.log(file.name);
		if(file) {
			this.uploaderService.upload(file).subscribe(
				msg => {
					input.value = null;
					this.message = msg;
				}
			);
		}
	}
}
