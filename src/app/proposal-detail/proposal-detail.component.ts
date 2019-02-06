import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Proposal } from "../models/proposal";
import { ProposalService } from "../services/proposal.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { MessageComponent } from "../message/message.component";
import { ActivatedRoute } from '@angular/router';
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
import { FileService } from "../services/file.service";

@Component({
	selector: 'app-proposal-detail',
	templateUrl: './proposal-detail.component.html',
	styleUrls: [ './proposal-detail.component.css' ]
})
export class ProposalDetailComponent implements OnInit {

	proposalId: string;
	proposal: Proposal;
	proposalForm: FormGroup;
	coProposers: FormArray;

	fileUploads: Observable<string[]>;

	routerParameter: string;

	selectedIndex = 0;

	selectTab(index: number): void {
		window.scrollTo(0, 0)
		event.preventDefault();
		this.selectedIndex = index;
		this.fileUploads = this.fileService.getFiles(this.proposalId);
	}


	constructor(
		private proposalService: ProposalService,
		private fileService: FileService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		public auth: AuthService,
		public router: Router,
		public message: MessageComponent
	) {
	}

	ngOnInit() {
		this.proposalForm = this.formBuilder.group({
			proposalId: [ '' ],
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
			linksWithIndustryDetails: [''],
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
				hasDoneProteinPurification: [ '' ],

				hasProteinDeuterationExperience: [ '' ],
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
				other: [ '' ]
			}),
			other: [ '' ]
		});

		this.proposalService.addProposal(this.proposalForm.value)
		.subscribe(
			response => {
				this.proposal = response;
				this.proposalForm.setValue(response);
				console.log('Successfully created proposal: ' + response.proposalId)
			},
			error => {
				console.log(error)
			}
		)
	}


	save() {
		this.proposalService.editProposal(this.proposalForm.value)
		.subscribe(
			data => {
				if(data.status === 200) {
					alert('Proposal updated successfully.');
					this.router.navigate([ 'proposals' ]);
				} else {
					alert(data.message);
				}
			},
			error => {
				alert(error);
			}
		);
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

	createCoProposer()
		:
		FormGroup {
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


}
