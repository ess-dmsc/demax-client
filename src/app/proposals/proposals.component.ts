import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { AuthService } from "../services/auth.service";
import { TestService } from "../services/test.service";
import { catchError, last, map, tap } from "rxjs/operators";

@Component({
	selector: 'app-proposals',
	templateUrl: './proposals.component.html',
	styleUrls: [ './proposals.component.css' ],
	providers: [ TestService ]
})
export class ProposalsComponent implements OnInit {
	proposal = new Proposal();
	proposals: Proposal[] = [];
	isEditing = false;
	panelOpenState = false;
	message: string;

	selectedIndex = 0;


	selectTab(index: number): void {
		event.preventDefault();
		this.selectedIndex = index;
	}

	step = 0;

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}

	addProposalForm: FormGroup;

	proposalForm = this.formBuilder.group({
		dateCreated: [ '' ],

		experimentTitle: [ '' ],
		briefSummary: [ '' ],

		mainProposerFirstName: [ '' ],
		mainProposerLastName: [ '' ],
		mainProposerAffiliation: [ '' ],
		mainProposerEmail: [ '' ],
		mainProposerPhone: [ '' ],

		needByDate: [ '' ],
		needByDateMotivation: [ '' ],

		wantsCrystallization: false,
		wantsBiomassDeuteration: false,
		wantsProteinDeuteration: false,
		wantsChemicalDeuteration: false,

		lab: [ '' ],
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
			typicalProteinConcentrationUsed: [ '' ]
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
		bioSafety: this.formBuilder.group({
			ioSafetyContainmentLevel: [ '' ],
			organismRisk: [ '' ],
			organismRiskDetails: [ '' ]
		}),
		proteinDeuteration: this.formBuilder.group({
			moleculeName: [ '' ],
			moleculeIdentifier: [ '' ],
			molecularWeight: [ '' ],
			oligomerizationState: [ '' ],
			expressionRequirements: [ '' ],
			moleculeOrigin: [ '' ],
			expressionPlasmidProvidedByUser: [ '' ],
			details: [ '' ],
			amountNeeded: [ '' ],
			amountNeededMotivation: [ '' ],
			deuterationLevelRequired: [ '' ],
			deuterationLevelMotivation: [ '' ],
			needsPurificationSupport: [ '' ],
			hasDoneUnlabeledProteinExpression: [ '' ],
			hasPurifiedUnlabeledProtein: [ '' ],
			hasProteinDeuterationExperience: [ '' ]
		}),
		chemicalDeuteration: this.formBuilder.group({
			moleculeName: [ '' ],
			amount: [ '' ],
			amountMotivation: [ '' ],
			deuterationLocationAndPercentage: [ '' ],
			deuterationLevelMotivation: [ '' ],
			chemicalStructure: [ '' ],
			hasPreviousProductionExperience: [ '' ],
		}),
		needByDateAttachment: [ '' ],
		pbdIdReferenceAttachment: [ '' ],
		organismReferenceAttachment: [ '' ],
		needsPurificationSupportAttachment: [ '' ],
		chemicalStructureAttachment: [ '' ],
		proposalTemplate: [ '' ],
		generatedProposal: [ '' ],
		mergedPdfFile: [ '' ],
	});

	constructor(
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		private uploaderService: TestService,
		private http: HttpClient,
		public auth: AuthService
	) {
	}

	onSubmit() {
		console.warn(this.proposalForm.value);
		this.proposalService.addProposal(this.proposalForm.value).subscribe(
			res => {
				this.proposals.push(res);
				this.proposalForm.reset();
			},
			error => console.log(error)
		);
	}

	ngOnInit() {
		this.getProposals();
		this.addProposalForm = this.formBuilder.group({})

	}

	get coProposers() {
		return this.proposalForm.get('coProposers') as FormArray;
	}

	addCoProposer() {
		event.preventDefault();
		this.coProposers.push(this.formBuilder.control(''));
	}

	getProposals() {
		this.proposalService.getProposals().subscribe(
			data => this.proposals = data,
			error => console.log(error),
		);
	}

	addProposal() {
		this.proposalService.addProposal(this.proposalForm.value).subscribe(
			response => {
				this.proposals.push(response);
				this.proposalForm.reset();
			},
			error => console.log(error)
		);
	}

	generatePdf() {
		event.preventDefault();
	}

	enableEditing(proposal: Proposal) {
		this.isEditing = true;
		this.proposal = proposal;
	}

	cancelEditing() {
		this.isEditing = false;
		this.proposal = new Proposal();
		this.getProposals();
	}

	editProposal(proposal: Proposal) {
		this.proposalService.editProposal(proposal).subscribe(
			() => {
				this.isEditing = false;
				this.proposal = proposal;
			},
			error => console.log(error)
		);
	}

	deleteProposal(proposal: Proposal) {
		if(window.confirm('Are you sure you want to permanently delete this proposal?')) {
			this.proposalService.deleteProposal(proposal).subscribe(
				() => {
					const pos = this.proposals.map(element => element.proposalId).indexOf(proposal.proposalId);
					this.proposals.splice(pos, 1);
				},
				error => console.log(error)
			);
		}
	}

	onPicked(input: HTMLInputElement) {
		const file = input.files[ 0 ];
		const formData: FormData = new FormData();
		formData.append('file', file);
		formData.append('proposal', this.proposal.proposalId)
		if(file) {
			const req = new HttpRequest('POST', 'api/file/upload', formData, {
				reportProgress: true
			});
		}
	}

}