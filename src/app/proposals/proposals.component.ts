import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { AuthService } from "../services/auth.service";

@Component({
	selector: 'app-proposals',
	templateUrl: './proposals.component.html',
	styleUrls: [ './proposals.component.css' ]
})
export class ProposalsComponent implements OnInit {
	proposal = new Proposal();
	proposals: Proposal[] = [];
	isEditing = false;
	isCreating = false;
	panelOpenState = false;

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
	experimentTitle = new FormControl('');
	briefSummary = new FormControl('');
	mainProposerFirstName = new FormControl('');
	mainProposerLastName = new FormControl('');
	mainProposerAffiliation = new FormControl('');
	mainProposerEmail = new FormControl('');
	mainProposerPhone = new FormControl('');
	needByDate = new FormControl('');
	needByDateMotivation = new FormControl('');
	needByDateAttachment = new FormControl('');
	lab = new FormControl('');

	proposalForm = this.formBuilder.group({
		experimentTitle: [ '' ],
		briefSummary: [ '' ],
		mainProposerFirstName: [ '' ],
		mainProposerLastName: [ '' ],
		mainProposerAffiliation: [ '' ],
		mainProposerEmail: [ '' ],
		mainProposerPhone: [ '' ],
		needByDate: [ '' ],
		needByDateMotivation: [ '' ],
		needByDateAttachment: [ '' ],
		lab: [ '' ],
		coProposers: this.formBuilder.array([
			this.formBuilder.control('')
		]),
		crystallization: this.formBuilder.group({
			moleculeName: [ '' ],
			moleculeIdentifier: [ '' ],
			molecularWeight: [ '' ],
			oligomerizationState: [ '' ],
			crystalStructureReferencePDF: [ '' ],
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
			organismProvidedByUser: false,
			organismDetails: [ '' ],
			organismReferenceAttachment: [ '' ],
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
			details: [ '' ],
			amountNeeded: [ '' ],
			amountNeededMotivation: [ '' ],
			deuterationLevelRequired: [ '' ],
			deuterationLevelMotivation: [ '' ],
			needsPurificationSupport: [ '' ],
			needsPurificationSupportAttachment: [ '' ],
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
			hasPreviousProductionExperienceAttachment: [ '' ]
		})
	});

	constructor(
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
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
		this.addProposalForm = this.formBuilder.group({
			experimentTitle: this.experimentTitle,
			briefSummary: this.briefSummary,
			mainProposerFirstName: this.mainProposerFirstName,
			mainProposerLastName: this.mainProposerLastName,
			mainProposerAffiliation: this.mainProposerAffiliation,
			mainProposerEmail: this.mainProposerEmail,
			mainProposerPhone: this.mainProposerPhone,
			needByDate: this.needByDate,
			lab: this.lab
		})

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
				this.isCreating = false;
			},
			error => console.log(error)
		);
	}

	enableCreating() {
		this.isCreating = true;
	}

	enableEditing(proposal: Proposal) {
		this.isEditing = true;
		this.proposal = proposal;
	}

	cancelCreating() {
		this.isCreating = false;
		this.proposal = new Proposal();
		this.getProposals();
	}

	cancelEditing() {
		this.isEditing = false;
		this.isCreating = false;
		this.proposal = new Proposal();
		this.getProposals();
	}

	editProposal(proposal: Proposal) {
		this.proposalService.editProposal(proposal).subscribe(
			() => {
				this.isEditing = false;
				this.isCreating = false;
				this.proposal = proposal;
			},
			error => console.log(error)
		);
	}

	deleteProposal(proposal: Proposal
	) {
		if(window.confirm('Are you sure you want to permanently delete this proposal?')) {
			this.proposalService.deleteProposal(proposal).subscribe(
				() => {
					const pos = this.proposals.map(element => element._id).indexOf(proposal._id);
					this.proposals.splice(pos, 1);
				},
				error => console.log(error)
			);
		}
	}
}