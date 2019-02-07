import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProposalService } from '../services/proposal.service';
import { Proposal } from '../models/proposal';
import { AuthService } from "../services/auth.service";

import { AppConfig } from "../app-config.module";
import { APP_CONFIG } from "../app-config.module";
import { MessageComponent } from "../message/message.component";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { FileService } from "../services/file.service";

@Component({
	selector: 'app-proposal-list',
	templateUrl: './proposal-list.component.html',
	styleUrls: [ './proposal-list.component.css' ]
})
export class ProposalListComponent implements OnInit {


	url = this.appConfig.demaxBaseUrl;
	displayedColumns: string[] = [ 'proposalId', 'experimentTitle', 'mainProposer', 'options' ];

	proposal = new Proposal();
	proposals: Proposal[] = [];

	isLoading = true;
	isEditing = false;

	fileUploads: Observable<string[]>;
	selectedFiles: FileList;
	attachmentType: string;
	currentFileUpload: File;
	progress: { percentage: number } = {percentage: 0};


	selectedIndex = 0;
	experimentTitle = new FormControl('', [
		Validators.required
	]);


	selectTab(index: number): void {
		window.scrollTo(0, 0)
		event.preventDefault();
		this.selectedIndex = index;
		this.progress.percentage = 0;
	}


	proposalForm = this.formBuilder.group({
		dateCreated: [ '' ],
		experimentTitle: [ '', Validators.required ],
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
		private fileService: FileService,
		public router: Router,
		public message: MessageComponent
	) {
	}

	submitProposal(proposal: Proposal) {
		if(window.confirm('Are you sure you want to submit?')) {
			window.scrollTo(0, 0);
			this.proposalService.editProposal(this.proposal).subscribe(
				() => {
					this.message.setMessage('Proposal ' + this.proposal.proposalId + ' has been submitted!', 'success');
					this.router.navigate([ '/home' ])
				}
			)
		}
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

	selectFile(event) {
		this.selectedFiles = event.target.files;
		this.attachmentType = event.target.name;
		this.currentFileUpload = this.selectedFiles.item(0);
		this.progress.percentage = 0;
		this.fileService.upload(this.currentFileUpload, this.proposal, this.attachmentType).subscribe(
			event => {
				if(event.type === HttpEventType.UploadProgress) {
					this.progress.percentage = Math.round(100 * event.loaded / event.total);
				} else if(event instanceof HttpResponse) {
					console.log('File is completely uploaded!');
					this.message.setMessage(this.currentFileUpload.name + ' was successfully uploaded', 'success');
				}
			},
			error => {
				this.message.setMessage(this.currentFileUpload.name + ' failed to upload', 'danger');

			}
		);
		this.fileUploads = this.fileService.getFiles(this.proposal.proposalId);
		this.selectedFiles = undefined;
	}
}
