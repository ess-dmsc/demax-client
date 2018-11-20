import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProposalService } from '../proposal.service';
import { ToastComponent } from '../components/toast/toast.component';
import { Proposal } from '../proposal';

@Component({
	selector: 'app-proposals',
	template: `
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
					<mat-form-field>
						<input matInput type="text" name="experimentTitle"
						       [(ngModel)]="proposal.experimentTitle" placeholder="experimentTitle" required>
					</mat-form-field>
					<mat-form-field>
						<input matInput type="text" name="briefSummary" [(ngModel)]="proposal.briefSummary"
						       placeholder="briefSummary" required>
					</mat-form-field>
					<mat-form-field>
						<input matInput type="text" name="mainProposer" [(ngModel)]="proposal.mainProposer"
						       placeholder="mainProposer" required>
					</mat-form-field>
					<mat-form-field>
						<button class="btn btn-sm btn-primary mr-2" type="submit" [disabled]="!form.form.valid">
							<i class="fa fa-floppy-o"></i> Save
						</button>
						<button class="btn btn-sm btn-warning" (click)="cancelEditing()">
							<i class="fa fa-times"></i> Cancel
						</button>
					</mat-form-field>

				</form>
			</mat-card-content>
			<mat-card-content *ngIf="!isEditing">
				<ul>
					<li *ngFor="let proposal of proposals">
						<div>{{proposal._id}}</div>
						<div>{{proposal.experimentTitle}}</div>
						<div>{{proposal.mainProposer}}</div>
						<div>
							<button class="btn btn-sm btn-primary" (click)="enableEditing(proposal)">
								<i class="fa fa-pencil"></i> Edit
							</button>
							<button class="btn btn-sm btn-danger ml-1" (click)="deleteProposal(proposal)">
								<i class="fa fa-trash"></i> Delete
							</button>
						</div>
					</li>
				</ul>
			</mat-card-content>
			<mat-card-content *ngIf="!isEditing">
				<h4>Create new proposal</h4>
				<form [formGroup]="addProposalForm" (ngSubmit)="addProposal()">
					<mat-form-field>
						<input matInput type="text" name="experimentTitle"
						       formControlName="experimentTitle" placeholder="experimentTitle">
					</mat-form-field>
					<mat-form-field>
						<input matInput type="text" name="briefSummary"
						       formControlName="briefSummary" placeholder="briefSummary">
					</mat-form-field>
					<mat-form-field>
						<input matInput type="text" name="mainProposer"
						       formControlName="mainProposer" placeholder="mainProposer">
					</mat-form-field>
					<mat-form-field>
						<button mat-raised-button type="submit" style="background-color: lime;"
						        [disabled]="!addProposalForm.valid">
							<i class="fa fa-plus"></i> Submit
						</button>
					</mat-form-field>
				</form>
			</mat-card-content>
		</mat-card>

	`
})
export class ProposalsComponent implements OnInit {

	proposal = new Proposal();
	proposals: Proposal[] = [];
	isLoading = true;
	isEditing = false;

	addProposalForm: FormGroup;
	experimentTitle = new FormControl('', Validators.required);
	briefSummary = new FormControl('', Validators.required);
	mainProposer = new FormControl('', Validators.required);

	constructor(
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		public toast: ToastComponent
	) {
	}

	ngOnInit() {
		this.getProposals();
		this.addProposalForm = this.formBuilder.group({
			experimentTitle: this.experimentTitle,
			briefSummary: this.briefSummary,
			mainProposer: this.mainProposer
		});
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
				this.toast.setMessage('item added successfully.', 'success');
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
		this.toast.setMessage('item editing cancelled.', 'warning');
		// reload the proposals to reset the editing
		this.getProposals();
	}

	editProposal(proposal: Proposal) {
		this.proposalService.editProposal(proposal).subscribe(
			() => {
				this.isEditing = false;
				this.proposal = proposal;
				this.toast.setMessage('item edited successfully.', 'success');
			},
			error => console.log(error)
		);
	}

	deleteProposal(proposal: Proposal) {
		if(window.confirm('Are you sure you want to permanently delete this item?')) {
			this.proposalService.deleteProposal(proposal).subscribe(
				() => {
					const pos = this.proposals.map(elem => elem._id).indexOf(proposal._id);
					this.proposals.splice(pos, 1);
					this.toast.setMessage('item deleted successfully.', 'success');
				},
				error => console.log(error)
			);
		}
	}

}
