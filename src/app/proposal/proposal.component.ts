import { Component, OnInit } from '@angular/core';
import { ProposalService } from "../services/proposal.service";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { MatDialog } from "@angular/material";
import { Proposal } from "../models/proposal";
import { MaterialModule } from "../external/material.module";
import { Router } from "@angular/router";

@Component({
	selector: 'app-proposal',
	template: `
		<mat-card style="width: 50%; margin: 2rem auto;">
			<form [formGroup]="proposalForm">
				<mat-action-row><h4>Test form</h4></mat-action-row>
				<mat-form-field>
					<input matInput formControlName="experimentTitle" placeholder="Experiment title">
				</mat-form-field>
				<mat-form-field>
					<textarea matInput formControlName="briefSummary" placeholder="Brief summary"></textarea>
				</mat-form-field>
				<div formGroupName="mainProposer">
					<mat-form-field>
						<input matInput formControlName="email" placeholder="Email">
					</mat-form-field>
					<mat-form-field>
						<input matInput formControlName="phone" placeholder="Phone">
					</mat-form-field>
				</div>

				<div formArrayName="coProposers">
					<div *ngFor="let coProposer of coProposerForms.controls; let i=index" [formGroupName]="i">
						<mat-card style="display: flex; flex-wrap: wrap; justify-content: space-around;">
						<span>
							<mat-form-field style="display: inline; width: 50%;">
								<input matInput formControlName="firstName" placeholder="First name">
							</mat-form-field>
							<mat-form-field style="display: inline; width: 50%;">
								<input matInput formControlName="lastName" placeholder="Last name">
							</mat-form-field>
							<mat-form-field>
								<input matInput formControlName="affiliation" placeholder="Affiliation">
							</mat-form-field>
						</span>

							<span>
								<button (click)="deleteCoProposer(i)">Delete</button>
							</span>
						</mat-card>

					</div>
				</div>

				<button (click)="addCoProposer()">Add Co-Proposer</button>
				<button (click)="addProposal()">Submit</button>
			</form>
		</mat-card>
	`
})
export class ProposalComponent implements OnInit {
	proposal = new Proposal();

	proposalForm: FormGroup;
	coProposers: FormArray;

	constructor(
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		private http: HttpClient,
		public auth: AuthService,
		public dialog: MatDialog,
		private router: Router
	) {
	}

	ngOnInit() {
		this.proposalForm = this.formBuilder.group({
			experimentTitle: '',
			briefSummary: '',
			mainProposer: this.formBuilder.group({
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				title: '',
				employer: '',
				sector: ''
			}),
			coProposers: this.formBuilder.array([ this.createCoProposer() ]),
			needByDate: '',
			linksWithIndustry: '',
			coProposerStudents: '',
			workTowardsStudentsDegree: '',
			wantsCrystallization: false,
			wantsBiomassDeuteration: false,
			wantsProteinDeuteration: false,
			wantsOtherDeuteration: false,
			wantsChemicalDeuteration: false,
		})
	}

	addProposal() {
		this.proposalService.addProposal(this.proposalForm.value).subscribe(response => {
			this.proposalForm.reset()
			this.router.navigate(['/proposals'])
		})
	}


	addCoProposer() {
		event.preventDefault();
		const coProposer = this.formBuilder.group({
			firstName: [],
			lastName: [],
			affiliation: []
		})
		this.coProposerForms.push(coProposer);

	}

	createCoProposer(): FormGroup {
		return this.formBuilder.group({
			firstName: '',
			lastName: '',
			affiliation: ''
		});
	}

	deleteCoProposer(i) {
		this.coProposerForms.removeAt(i)
	}

	get coProposerForms() {
		return this.proposalForm.get('coProposers') as FormArray
	}

}
