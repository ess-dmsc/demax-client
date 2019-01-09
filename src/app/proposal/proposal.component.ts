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
		<style></style>
		<mat-tab-group>

		</mat-tab-group>
		<mat-card style="width: 50%; margin: 2rem auto;">
			<form [formGroup]="proposalForm">
				<mat-action-row>
					<h4>Test form</h4>
				</mat-action-row>
				<mat-form-field>
					<input matInput formControlName="experimentTitle" placeholder="Experiment title">
				</mat-form-field>
				<mat-form-field>
					<textarea matInput formControlName="briefSummary" placeholder="Brief summary"></textarea>
				</mat-form-field>
				<mat-action-row>Main proposer</mat-action-row>
				<div formGroupName="mainProposer">
					<mat-form-field>
						<input matInput formControlName="firstName" placeholder="First name">
					</mat-form-field>
					<mat-form-field>
						<input matInput formControlName="lastName" placeholder="Last name">
					</mat-form-field>
					<mat-form-field>
						<input matInput formControlName="email" placeholder="Email">
					</mat-form-field>
					<mat-form-field>
						<input matInput formControlName="phone" placeholder="Phone">
					</mat-form-field>
					<mat-action-row>Affiliation</mat-action-row>
					<div>
						<mat-form-field>
							<input matInput formControlName="title" placeholder="Job title">
						</mat-form-field>
						<mat-form-field>
							<input matInput formControlName="employer" placeholder="Employer">
						</mat-form-field>
						<mat-form-field>
							<input matInput formControlName="sector" placeholder="Sector">
						</mat-form-field>
					</div>
				</div>

				<div formArrayName="coProposers">
					<div *ngFor="let coProposer of coProposerForms.controls; let i=index" [formGroupName]="i">
						<mat-card>
							<mat-form-field>
								<input matInput formControlName="firstName" placeholder="First name">
							</mat-form-field>
							<mat-form-field>
								<input matInput formControlName="lastName" placeholder="Last name">
							</mat-form-field>
							<mat-form-field>
								<input matInput formControlName="affiliation" placeholder="Affiliation">
							</mat-form-field>
								<button mat-raised-button color="warn" (click)="deleteCoProposer(i)">Delete</button>
						</mat-card>
						
					</div>
					<mat-action-row>
						<button mat-raised-button color="primary" (click)="addCoProposer()">Add Co-Proposer</button>
					</mat-action-row>
				</div>
				<mat-radio-group formControlName="linksWithIndustry">
					<p>Links with industry</p>
					<mat-radio-button value="yes">Yes</mat-radio-button>
					<mat-radio-button value="no">No</mat-radio-button>
				</mat-radio-group>
				<mat-radio-group formControlName="coProposerStudents">
					<p>Are any of the co-proposers students?</p>
					<mat-radio-button value="yes">Yes</mat-radio-button>
					<mat-radio-button value="no">No</mat-radio-button>
				</mat-radio-group>
				<mat-radio-group formControlName="workTowardsStudentsDegree">
					<p>Does the proposal work towards a students degree?</p>
					<mat-radio-button value="yes">Yes</mat-radio-button>
					<mat-radio-button value="no">No</mat-radio-button>
				</mat-radio-group>
				<fieldset>
					<p>In the next sections you will fill out the applicable area of support your proposal requires. Select one, or as many as apply, from the alternatives below.</p>
					<mat-checkbox formControlName="wantsCrystallization" >Crystallization</mat-checkbox>
					<mat-checkbox formControlName="wantsBiologicalDeuteration">Biological deuteration</mat-checkbox>
					<mat-checkbox formControlName="wantsChemicalDeuteration">Chemical deuteration</mat-checkbox>
				</fieldset>

				<button (click)="addProposal()">Submit</button>
			</form>
		</mat-card>
	`
})
export class ProposalComponent implements OnInit {
	proposal = new Proposal();
	proposalForm: FormGroup;
	coProposers: FormArray;
	selectedIndex = 0;

	step = 0;

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
			wantsBiologicalDeuteration: false,
			wantsChemicalDeuteration: false,
		})
	}

	addProposal() {
		this.proposalService.addProposal(this.proposalForm.value).subscribe(response => {
			this.proposalForm.reset()
			this.router.navigate([ '/proposals' ])
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

	selectTab(index: number): void {
		event.preventDefault();
		this.selectedIndex = index;
	}

}
