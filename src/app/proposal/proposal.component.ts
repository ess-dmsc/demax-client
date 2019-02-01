import { Component, Inject, OnInit } from '@angular/core';
import { ProposalService } from "../services/proposal.service";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { MatDialog } from "@angular/material";
import { Proposal } from "../models/proposal";
import { MaterialModule } from "../external/material.module";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { APP_CONFIG, AppConfig } from "../app-config.module";

@Component({
	selector: 'app-proposal',
	templateUrl: './proposal.component.html',
	styleUrls: [ './proposal.component.css' ]
})
export class ProposalComponent implements OnInit {
	url = this.appConfig.demaxBaseUrl;

	attachments = [];
	files: Observable<string[]>;
	selectedFileName = '';
	selectedFiles: FileList;
	selectedInput: string;
	currentFileUpload: File;
	proposal = new Proposal();
	coProposers: FormArray;
	selectedIndex = 0;
	hasReadTos = false;

	progress: { percentage: number } = {percentage: 0};

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		public auth: AuthService,
		private router: Router
	) {
	}


	proposalForm = this.formBuilder.group({
		dateCreated: [ '' ],
		experimentTitle: [ '' ],
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
			hasPreviousProductionExperience: [ '' ],
			other: [ '' ]
		}),
		other: [ '' ],
		attachments: [ '' ],
		pbdIdReferenceAttachment: [ '' ],
		organismReferenceAttachment: [ '' ],
		needsPurificationSupportAttachment: [ '' ],
		chemicalStructureAttachment: [ '' ],
		moleculePreparationReferenceArticle: [ '' ],
		proposalTemplate: [ '' ],
		generatedProposal: [ '' ],
		mergedProposal: [ '' ],
	});

	ngOnInit() {
		this.createProposal();
	}

	createProposal() {
		this.proposalService.addProposal(this.proposalForm.value).subscribe(
			response => {
				this.proposal = response;
			},
			error => console.log(error)
		);
	}

	saveProposal(proposal: Proposal) {
		this.proposalService.editProposal(proposal).subscribe(
			() => {
				this.proposal = proposal;
			},
			error => console.log(error),
			this.router.navigate['/proposals']
		);
	}

	addCoProposer() {
		event.preventDefault();
		const coProposer = this.formBuilder.group({
			firstName: [],
			lastName: [],
			affiliation: [],
			email: []
		})
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

	selectFile(event) {
		this.selectedFiles = event.target.files;
		this.selectedInput = event.target.name.toString();
		this.selectedFileName = event.target.files.item(0).name;
		this.upload();
	}

	upload() {
		this.progress.percentage = 0;
		this.currentFileUpload = this.selectedFiles.item(0);
		this.proposalService.pushFileToStorage(this.currentFileUpload, this.proposal, this.selectedInput).subscribe(event => {
			console.log('File is completely uploaded!');
		});
		this.selectedFiles = undefined;
		this.getFiles();
	}

	getFiles() {
		this.proposalService.getFiles(this.proposal).subscribe(
			data => this.attachments = data,
			error => console.log(error),
		);
	}

	removeFile(filename: String) {
		event.preventDefault();
		this.proposalService.removeFile(filename).subscribe(
			() => {
				this.files = this.proposalService.getFiles(this.proposal);
			},
			error => console.log(error)
		)
	}

}
