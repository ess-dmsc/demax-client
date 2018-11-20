import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ProposalService } from '../proposal.service';
import { ToastComponent } from '../components/toast/toast.component';
import { Proposal } from '../proposal';

@Component({
	selector: 'app-proposals',
	template: `
		<style>
			fieldset {
				padding: 1rem;
			}

			input {
				margin: 0.5rem;
			}
		</style>
		<app-toast [message]="toast.message"></app-toast>

		<mat-card>
			<mat-card-header>
				<mat-card-title>
					My proposals {{proposals.length}})
				</mat-card-title>
			</mat-card-header>
			<mat-card-content *ngIf="proposals.length === 0">
				There are no proposals in the database. Create a new proposal below.
			</mat-card-content>
			<mat-card-content *ngIf="isEditing">
				<form #form="ngForm" (ngSubmit)="editProposal(proposal)">
					<input class="form-control" type="text" name="experimentTitle"
					       [(ngModel)]="proposal.experimentTitle" placeholder="experimentTitle" required>
					<input class="form-control" type="text" name="briefSummary" [(ngModel)]="proposal.briefSummary"
					       placeholder="Brief summary">
					<input class="form-control" type="text" name="mainProposerFirstName" [(ngModel)]="proposal.mainProposerFirstName"
					       placeholder="First name">
					<input class="form-control" type="text" name="mainProposerLastName" [(ngModel)]="proposal.mainProposerLastName"
					       placeholder="Last name">
					<input class="form-control" type="text" name="mainProposerAffiliation" [(ngModel)]="proposal.mainProposerAffiliation"
					       placeholder="Affiliation">
					<input class="form-control" type="text" name="mainProposerPhone" [(ngModel)]="proposal.mainProposerPhone"
					       placeholder="Phone">
					<input class="form-control" type="text" name="mainProposerEmail" [(ngModel)]="proposal.mainProposerEmail"
					       placeholder="Email">
					<input class="form-control" type="text" name="coProposers" [(ngModel)]="proposal.coProposers"
					       placeholder="Co-proposer(s)">
					<input class="form-control" type="text" name="lab" [(ngModel)]="proposal.lab"
					       placeholder="lab">
					<input class="form-control" type="text" name="needByDate" [(ngModel)]="proposal.needByDate"
					       placeholder="'Need-by-date'">
					<button class="btn btn-sm btn-primary mr-2" type="submit" [disabled]="!form.form.valid">
						<i class="fa fa-floppy-o"></i> Save
					</button>
					<button class="btn btn-sm btn-warning" (click)="cancelEditing()">
						<i class="fa fa-times"></i> Cancel
					</button>

				</form>
			</mat-card-content>
			<mat-card-content *ngIf="!isEditing" style="width:100%;">
				<table style="width:100%;">
					<tr>
						<td>ID</td>
						<td>Title</td>
						<td>Created</td>
						<td>Options</td>
					</tr>
					<tr *ngFor="let proposal of proposals">
						<td>{{proposal._id}}</td>
						<td>{{proposal.experimentTitle}}</td>
						<td>{{proposal.dateCreated}}</td>
						<td>
							<button class="btn btn-sm btn-primary" (click)="enableEditing(proposal)">
								<i class="fa fa-pencil"></i> Edit
							</button>
						</td>
						<td>
							<button class="btn btn-sm btn-danger ml-1" (click)="deleteProposal(proposal)">
								<i class="fa fa-trash"></i> Delete
							</button>
						</td>
					</tr>
				</table>
			</mat-card-content>
			<mat-card-content *ngIf="!isEditing" style="max-width: 50%;">
				<h4>Create new proposal</h4>
				<form [formGroup]="addProposalForm" (ngSubmit)="addProposal()">
					<fieldset>
						<mat-label>1. Experiment title</mat-label>

						<input class="form-control" type="text" name="experimentTitle"
						       formControlName="experimentTitle">
					</fieldset>
					<mat-divider></mat-divider>

					<fieldset>
						<mat-label>2. Brief summary</mat-label>
						<textarea class="form-control" name="briefSummary"
						          formControlName="briefSummary"></textarea></fieldset>
					<mat-divider></mat-divider>

					<fieldset>
						<mat-label>3. Main proposer</mat-label>
						<input class="form-control" type="text" name="mainProposerFirstName"
						       formControlName="mainProposerFirstName" placeholder="First name">
						<input class="form-control" type="text" name="mainProposerLastName"
						       formControlName="mainProposerLastName" placeholder="Last name">
						<input class="form-control" type="text" name="mainProposerAffiliation"
						       formControlName="mainProposerAffiliation" placeholder="Affiliation">
						<input class="form-control" type="text" name="mainProposerPhone"
						       formControlName="mainProposerPhone" placeholder="Phone">
						<input class="form-control" type="text" name="mainProposerEmail"
						       formControlName="mainProposerEmail" placeholder="Email">
					</fieldset>
					<mat-divider></mat-divider>
					<fieldset>
						<mat-label>4. Co-proposers(s)</mat-label>
						<input class="form-control" type="text" name="mainProposerEmail"
						       formControlName="mainProposerEmail" placeholder="Name">
						<input class="form-control" type="text" name="mainProposerEmail"
						       formControlName="mainProposerEmail" placeholder="Affiliation">
						<button mat-raised-button>Add</button>
					</fieldset>
					<fieldset>
						<mat-label>5. "Need-by-date"</mat-label>
						<p> Motivate “need by” date (e.g. based on awarded beamtime, or described intention to apply)
						</p>
						<input class="form-control" type="text" name="needByDate" formControlName="needByDate"
						       placeholder="needByDate">
						<app-upload></app-upload>
					</fieldset>
					<fieldset>
						<mat-divider></mat-divider>
						<p>In the next sections you will fill out the applicable area of support your proposal requires.
				Select one, or as many as apply, from (A) Crystallization, (B) Biological Deuteration, (C) Chemical
				Deuteration.</p>
						<button mat-raised-button type="submit" style="background-color: lime;"
						        [disabled]="!addProposalForm.valid">
							<i class="fa fa-plus"></i> Create proposal
						</button>
					</fieldset>
				</form>
			</mat-card-content>
		</mat-card>
	`
})
export class ProposalsComponent implements OnInit {
	filesToUpload: Array<File> = [];
	proposal = new Proposal();
	proposals: Proposal[] = [];
	isLoading = true;
	isEditing = false;

	addProposalForm: FormGroup;
	experimentTitle = new FormControl('');
	briefSummary = new FormControl('');
	mainProposerFirstName = new FormControl('');
	mainProposerLastName = new FormControl('');
	mainProposerAffiliation = new FormControl('');
	mainProposerEmail = new FormControl('');
	mainProposerPhone = new FormControl('');
	coProposers = new FormControl('');
	needByDate = new FormControl('');
	needByDateAttachment = new FormControl('');
	lab = new FormControl('');
	crystallization = new FormControl('');
	biomassDeuteration = new FormControl('');
	proteinDeuteration = new FormControl('');
	chemicalDeuteration = new FormControl('');

	constructor(
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		private http: HttpClient,
		public toast: ToastComponent
	) {
	}

	ngOnInit() {
		this.getProposals();
		this.addProposalForm = this.formBuilder.group({
			experimentTitle: this.experimentTitle,
			briefSummary: this.briefSummary,
			mainProposerFirstName: this.mainProposerFirstName,
			mainProposerLastName: this.mainProposerLastName,
			mainProposerAffiliation: this.mainProposerLastName,
			mainProposerPhone: this.mainProposerPhone,
			mainProposerEmail: this.mainProposerEmail,
			coProposers: this.coProposers,
			needByDate: this.needByDate,
			needByDateAttachment: this.needByDateAttachment,
			lab: this.lab,
			crystallization: this.crystallization,
			chemicalDeuteration: this.chemicalDeuteration,
			biomassDeuteration: this.biomassDeuteration,
			proteinDeuteration: this.proteinDeuteration
		});
	}

	upload() {
		const formData: any = new FormData();
		const files: Array<File> = this.filesToUpload;
		console.log(files);

		for(let i = 0; i < files.length; i++) {
			formData.append("uploads[]", files[ i ], files[ i ][ 'name' ]);
		}
		console.log('form data variable :   ' + formData.toString());
		this.http.post('http://localhost:8080/upload-multiple', formData)
		.subscribe(files => console.log('files', files))
	}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		//this.product.photo = fileInput.target.files[0]['name'];
	}

	getProposals() {
		this.proposalService.getProposals().subscribe(
			data => this.proposals = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	addProposal() {
		this.proposalService.addProposal(this.addProposalForm.value).subscribe(
			res => {
				this.proposals.push(res);
				this.addProposalForm.reset();
				this.toast.setMessage('proposal created successfully.', 'success');
			},
			error => console.log(error)
		);
	}

	enableEditing(proposal: Proposal) {
		this.isEditing = true;
		this.proposal = proposal;
	}

	cancelEditing() {
		this.isEditing = false;
		this.proposal = new Proposal();
		this.toast.setMessage('proposal editing cancelled.', 'warning');
		// reload the proposals to reset the editing
		this.getProposals();
	}

	editProposal(proposal: Proposal) {
		this.proposalService.editProposal(proposal).subscribe(
			() => {
				this.isEditing = false;
				this.proposal = proposal;
				this.toast.setMessage('proposal updated successfully.', 'success');
			},
			error => console.log(error)
		);
	}

	deleteProposal(proposal: Proposal) {
		if(window.confirm('Are you sure you want to permanently delete this proposal?')) {
			this.proposalService.deleteProposal(proposal).subscribe(
				() => {
					const pos = this.proposals.map(elem => elem._id).indexOf(proposal._id);
					this.proposals.splice(pos, 1);
					this.toast.setMessage('proposal deleted successfully.', 'success');
				},
				error => console.log(error)
			);
		}
	}

}
