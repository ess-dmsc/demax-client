import { Component, Inject, OnInit } from '@angular/core';
import { ProposalService } from '../services/proposal.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material';
import { Proposal } from '../models/proposal';
import { MaterialModule } from '../external/material.module';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { MessageComponent } from "../message/message.component";

@Component({
	selector: 'app-proposal',
	templateUrl: './proposal.component.html',
	styleUrls: [ './proposal.component.css' ]
})
export class ProposalComponent implements OnInit {

	url = this.appConfig.demaxBaseUrl;

	proposal = new Proposal();
	coProposers: FormArray;
	selectedIndex = 0;
	hasReadTos = false;
	proposalForm: FormGroup;

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		public auth: AuthService,
		private router: Router,
		public message: MessageComponent
	) {
	}

	ngOnInit() {
		this.proposalForm = this.formBuilder.group({
			experimentTitle: [ '', Validators.required ],
			briefSummary: [ '', Validators.required ],
			mainProposer: this.formBuilder.group({
				firstName: this.auth.currentUser.firstName,
				lastName: this.auth.currentUser.lastName,
				email: this.auth.currentUser.email,
				phone: this.auth.currentUser.phone,
				jobTitle: this.auth.currentUser.jobTitle,
				employer: this.auth.currentUser.employer,
				industry: this.auth.currentUser.industry
			}),
			coProposers: this.formBuilder.array([ this.createCoProposer() ]),
			needByDate: [ '', Validators.required ],
			needByDateMotivation: [ '', Validators.required ],
			needByDateAttachment: [ '', Validators.required ],
			lab: [ '', Validators.required ],
			linksWithIndustry: [ '', Validators.required ],
			coProposerStudents: [ '', Validators.required ],
			workTowardsStudentsDegree: [ '', Validators.required ],
			wantsCrystallization: false,
			wantsBiologicalDeuteration: false,
			wantsBiomassDeuteration: false,
			wantsProteinDeuteration: false,
			wantsOtherDeuteration: false,
			wantsChemicalDeuteration: false,
			crystallization: this.formBuilder.group({
				moleculeName: [ '' ],
				moleculeIdentifier: [ '' ],
				molecularWeight: [ '' ],
				oligomerizationState: [ '' ],
				pbdId: [ '' ],
				doi: [ '' ],
				crystallizationRequirements: [ '' ],
				crystallizationPrecipitantComposition: [ '' ],
				previousCrystallizationExperience: [ '' ],
				estimatedCrystallizationProductionTime: [ '' ],
				typicalCrystalSize: [ '' ],
				typicalYieldMgPerLiter: [ '' ],
				storageConditions: [ '' ],
				stability: [ '' ],
				buffer: [ '' ],
				levelOfDeuteration: [ '' ],
				typicalProteinConcentrationUsed: [ '' ],
				other: [ '' ]
			}),
			biomassDeuteration: this.formBuilder.group({
				organismProvidedByUser: [ '' ],
				organismDetails: [ '' ],
				amountNeeded: [ '' ],
				stateOfMaterial: [ '' ],
				amountOfMaterialMotivation: [ '' ],
				deuterationLevelRequired: [ '' ],
				deuterationLevelMotivation: [ '' ]
			}),
			proteinDeuteration: this.formBuilder.group({
				moleculeName: [ '' ],
				moleculeIdentifier: [ '' ],
				molecularWeight: [ '' ],
				oligomerizationState: [ '' ],
				expressionRequirements: [ '' ],
				moleculeOrigin: [ '' ],
				expressionPlasmidProvidedByUser: [ '' ],
				expressionPlasmidProvidedByUserDetails: [ '' ],
				amountNeeded: [ '' ],
				amountNeededMotivation: [ '' ],
				deuterationLevelRequired: [ '' ],
				deuterationLevelMotivation: [ '' ],
				needsPurificationSupport: [ '' ],
				hasDoneUnlabeledProteinExpression: [ '' ],
				typicalYield: [ '' ],
				hasDonePurification: [ '' ],
				hasProteinPurificationExperience: [ '' ],
				proteinDeuterationResults: [ '' ],
				other: [ '' ]
			}),
			bioSafety: this.formBuilder.group({
				bioSafetyContainmentLevel: [ '' ],
				organismRisk: [ '' ],
				organismRiskDetails: [ '' ],
				other: [ '' ]
			}),
			chemicalDeuteration: this.formBuilder.group({
				moleculeName: [ '' ],
				amount: [ '' ],
				amountMotivation: [ '' ],
				deuterationLocationAndPercentage: [ '' ],
				deuterationLevelMotivation: [ '' ],
				hasPreparedMolecule: [ '' ],
				hasPreparedMoleculeProtocol: [ '' ],
				other: [ '' ]
			}),
			other: [ '' ]
		});
	}

	addProposal() {
		this.proposalService.addProposal(this.proposalForm.value).subscribe(response => {
			this.proposal = response;
			this.message.setMessage('Proposal ' + this.proposal.proposalId + ' successfully created', 'success');
			this.router.navigate(['/proposals']);
		}, error => {
			this.message.setMessage('HTTP Response Error 500 - Could not create proposal at this time', 'danger')
		})
	}

	addCoProposer() {
		event.preventDefault();
		const coProposer = this.formBuilder.group({
			firstName: [],
			lastName: [],
			affiliation: [],
			email: []
		});
		this.coProposerForms.push(coProposer);
	}

	createCoProposer(): FormGroup {
		return this.formBuilder.group({
			firstName: '',
			lastName: '',
			affiliation: '',
			email: ''
		});
	}

	deleteCoProposer(i) {
		console.log(i);
		this.coProposerForms.removeAt(i);
	}

	get coProposerForms() {
		return this.proposalForm.get('coProposers') as FormArray;
	}

	confirm() {
		this.hasReadTos = true;
	}

}
