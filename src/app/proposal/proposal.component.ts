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
		<style>
			mat-card {
				margin: 5rem;
				padding: 5rem;
			}

			mat-checkbox {
				margin: 2rem;
				display: block;
			}

			mat-radio-group {
				display: block;
			}

			mat-radio-button {
				margin: 2rem;
			}

			mat-form-field {
				width: 60%;
				margin: 1rem auto;
			}

			.smallFormField {
				width: 300px;
			}

			mat-form-field {}
		</style>
		<mat-card *ngIf="!hasReadTos">
			<mat-card-header>
				<mat-card-title>Proposal guidelines</mat-card-title>
			</mat-card-header>
			<mat-card-content>
				<p>Users are strongly encouraged to contact DEMAX staff prior to preparing and submitting a
					deuteration/crystallization proposal.</p>
				<p>General enquiries can be sent to: <a href="mailto:demax@esss.se">demax@esss.se</a> or to one of the<a
						routerLink="/contact"> subject matter experts.</a></p>
				<ul>
					<li> Proposals should be written in English, properly referenced, and prepared in the <a
							href="http://localhost:8080/word/attachment">Word template.</a> Please keep to the 2 page
						limit, including Summary, Background (Science Case, Practical Consideration, References,
						Figures/Tables)
					</li>
					<li> Access to DEMAX is granted on the basis of both a technical and a peer-review process.</li>
					<li> Proposals awarded during initial operations (2019-2022) will be free of charge. During formal
						user operations (beyond 2023) we reserve the right to ask for partial financial contributions
						towards consumables & shipping costs.
					</li>
					<li> During initial operations we will not limit access to DEMAX based on ESS-membership. Beyond
						this period we will respect the user access policy that will be applicable ESS-wide.
					</li>
					<li> Biological and chemical deuteration proposals are run as a service but users for protein
						crystallization are welcome to come in person as well.
					</li>
					<li>Proposals awarded during initial operations (2019-2021) will be free of charge. During formal
						user operations (beyond 2023) we reserve the right to ask for partial financial contributions
						towards consumables & shipping costs. Options
					</li>
					<p>*<em>Users should note that the contributions by DEMAX should be acknowledged in any publications
						containing materials obtained from us. For particularly challenging projects that require above
						average involvement from DEMAX, relevant DEMAX staff should be acknowledged through
						co-authorship of any subsequent publications.</em></p>
				</ul>
				<mat-card-actions>
					<mat-checkbox style="margin: 2rem;">I acknowledge the information above</mat-checkbox>
				</mat-card-actions>
				<mat-card-footer>
					<button mat-raised-button color="primary" (click)="confirm()">Create new proposal</button>
				</mat-card-footer>
			</mat-card-content>
		</mat-card>
		<mat-tab-group>
			<mat-tab label="1. General information">
				<mat-card *ngIf="hasReadTos">
					<form [formGroup]="proposalForm">
						<mat-action-row>
							<h3>1. General information</h3>
						</mat-action-row>
						<mat-form-field>
							<input matInput formControlName="experimentTitle" placeholder="Experiment title">
							<mat-hint align="start">Some hint</mat-hint>
						</mat-form-field>
						<mat-form-field>
							<textarea matInput formControlName="briefSummary" placeholder="Brief summary"></textarea>
						</mat-form-field>
						<mat-action-row><h4>Main proposer</h4></mat-action-row>
						<div formGroupName="mainProposer">
							<mat-form-field class="smallFormField">
								<input matInput formControlName="firstName" placeholder="First name">
							</mat-form-field>
							<mat-form-field class="smallFormField">
								<input matInput formControlName="lastName" placeholder="Last name">
							</mat-form-field>
							<br>
							<mat-form-field class="smallFormField">
								<input matInput formControlName="email" placeholder="Email">
							</mat-form-field>
							<mat-form-field class="smallFormField">
								<input matInput formControlName="phone" placeholder="Phone">
							</mat-form-field>
							<mat-label><h4>Affiliation</h4></mat-label>
							<div>
								<mat-form-field class="smallFormField">
									<input matInput formControlName="title" placeholder="Job title">
								</mat-form-field>
								<mat-form-field class="smallFormField">
									<input matInput formControlName="employer" placeholder="Employer">
								</mat-form-field>
								<mat-form-field>
									<input matInput formControlName="sector" placeholder="Sector">
								</mat-form-field>
							</div>
						</div>

						<div formArrayName="coProposers">
							<h4>Co-proposers</h4>
							<div *ngFor="let coProposer of coProposerForms.controls; let i=index" [formGroupName]="i">
								<mat-form-field class="smallFormField">
									<input matInput formControlName="firstName" placeholder="First name">
								</mat-form-field>
								<mat-form-field class="smallFormField">
									<input matInput formControlName="lastName" placeholder="Last name">
								</mat-form-field>
								<button mat-raised-button color="warn" (click)="deleteCoProposer(i)">Delete</button>
							</div>
							<mat-action-row>
								<button mat-raised-button color="primary" (click)="addCoProposer()">Add Co-Proposer
								</button>
							</mat-action-row>
						</div>
						<br>
						<br>
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
							<p>In the next sections you will fill out the applicable area of support your proposal
								requires.
								Select one, or as many as apply, from the alternatives below.</p>
							<mat-checkbox formControlName="wantsCrystallization">A) Crystallization</mat-checkbox>
							<mat-checkbox formControlName="wantsBiologicalDeuteration">B) Biological deuteration
							</mat-checkbox>
							<mat-checkbox formControlName="wantsChemicalDeuteration">C) Chemical deuteration
							</mat-checkbox>
						</fieldset>
						<mat-action-row>
							<button mat-button color="primary" (click)="addProposal()">Save</button>
							<button mat-button class="btn btn-danger" routerLink="/home">Cancel</button>
							<button mat-button class="btn btn-primary" (click)="selectTab(1)">Next</button>
						</mat-action-row>
					</form>
				</mat-card>
			</mat-tab>
			<mat-tab label="2. Crystallization"></mat-tab>
			<mat-tab label="3. Biological deuteration"></mat-tab>
			<mat-tab label="4. Chemical deuteration"></mat-tab>
			<mat-tab label="5. Review and submit"></mat-tab>
		</mat-tab-group>

	`
})
export class ProposalComponent implements OnInit {
	proposal = new Proposal();
	proposalForm: FormGroup;
	coProposers: FormArray;
	selectedIndex = 0;
	hasReadTos = false;

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
			crystallization: this.formBuilder.group({
				moleculeName: '',
				moleculeIdentifier: '',
				molecularWeight: '',
				oligomerizationState: '',
				pbdId: '',
				doi: '',
				crystallizationRequirements: '',
				crystallizationPrecipitantComposition: '',
				previousCrystallizationExperience: '',
				estimatedCrystallizationProductionTime: '',
				typicalCrystalSize: '',
				typicalYieldMgPerLiter: '',
				storageConditions: '',
				stability: '',
				buffer: '',
				levelOfDeuteration: '',
				typicalProteinConcentrationUsed: '',
				other: ''
			}),
			biomassDeuteration: this.formBuilder.group({
				organismProvidedByUser: '',
				organismDetails: '',
				amountNeeded: '',
				stateOfMaterial: '',
				amountOfMaterialMotivation: '',
				deuterationLevelRequired: '',
				deuterationLevelMotivation: ''
			}),
			proteinDeuteration: this.formBuilder.group({
				moleculeName: '',
				moleculeIdentifier: '',
				molecularWeight: '',
				oligomerizationState: '',
				expressionRequirements: '',
				moleculeOrigin: '',
				expressionPlasmidProvidedByUser: '',
				expressionPlasmidProvidedByUserDetails: '',
				amountNeeded: '',
				amountNeededMotivation: '',
				deuterationLevelRequired: '',
				deuterationLevelMotivation: '',
				needsPurificationSupport: '',
				hasDoneUnlabeledProteinExpression: '',
				typicalYield: '',
				hasDonePurification: '',
				hasProteinPurificationExperience: '',
				proteinDeuterationResults: '',
				other: ''
			}),
			bioSafety: this.formBuilder.group({
				bioSafetyContainmentLevel: '',
				organismRisk: '',
				organismRiskDetails: '',
				other: ''
			}),
			chemicalDeuteration: this.formBuilder.group({
				moleculeName: '',
				amount: '',
				amountMotivation: '',
				deuterationLocationAndPercentage: '',
				deuterationLevelMotivation: '',
				hasPreparedMolecule: '',
				hasPreparedMoleculeProtocol: '',
				other: ''
			}),
			other: '',
			pbdIdReferenceAttachment: '',
			organismReferenceAttachment: '',
			needsPurificationSupportAttachment: '',
			chemicalStructureAttachment: '',
			moleculePreparationReferenceArticle: '',
			proposalTemplate: '',
			generatedProposal: '',
			mergedProposal: '',
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
		console.log(i)
		this.coProposerForms.removeAt(i)
	}

	get coProposerForms() {
		return this.proposalForm.get('coProposers') as FormArray
	}

	selectTab(index: number): void {
		event.preventDefault();
		this.selectedIndex = index;
	}

	confirm() {
		this.hasReadTos = true;
	}

}
