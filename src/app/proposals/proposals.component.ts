import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from "@angular/common/http";
import { ProposalService } from '../services/proposal.service';
import { Proposal } from '../models/proposal';
import { AuthService } from "../services/auth.service";
import { catchError, last, map, tap } from "rxjs/operators";
import { MessageService } from "../services/message.service";
import { Observable } from "rxjs";
import { MatDialog, MatStep } from "@angular/material";

@Component({
	selector: 'app-proposals',
	templateUrl: './proposals.component.html',
	styleUrls: [ './proposals.component.css' ],
	providers: [ ProposalService ]
})
export class ProposalsComponent implements OnInit {
	proposal = new Proposal();
	proposals: Proposal[] = [];
	isEditing = false;
	panelOpenState = false;
	message: string;
	displayedColumns: string[] = [ 'proposalId', 'experimentTitle', 'options', 'pdf' ];
	selectedFiles: FileList;
	selectedInput: string;
	currentFileUpload: File;
	progress: { percentage: number } = {percentage: 0};

	selectedIndex = 0;


	selectTab(index: number): void {
		event.preventDefault();
		this.selectedIndex = index;
	}

	addProposalForm: FormGroup;

	proposalForm = this.formBuilder.group({
		dateCreated: [ '' ],
		experimentTitle: [ '', Validators.required ],
		briefSummary: [ '', Validators.required ],
		mainProposer: this.formBuilder.group({
			firstName: [ '', Validators.required ],
			lastName: [ '', Validators.required ],
			email: [ '', Validators.required ],
			phone: [ '', Validators.required ],
			employer: [ '', Validators.required ],
			sector: [ '', Validators.required ],
			title: [ '', Validators.required ],
		}),
		coProposers: this.formBuilder.array(
			[
				{
					firstName: [ ' ' ],
					lastName: [ ' ' ],
					affiliation: [ ' ' ]
				}
			]),
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
		other: [ '' ],
		pbdIdReferenceAttachment: [ '' ],
		organismReferenceAttachment: [ '' ],
		needsPurificationSupportAttachment: [ '' ],
		chemicalStructureAttachment: [ '' ],
		moleculePreparationReferenceArticle: [ '' ],
		proposalTemplate: [ '' ],
		generatedProposal: [ '' ],
		mergedProposal: [ '' ],
	});

	constructor(
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		private http: HttpClient,
		public auth: AuthService,
		public dialog: MatDialog
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
		this.proposalService.getFiles();
		this.addProposalForm = this.formBuilder.group({})
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
				this.getProposals();
			},
			error => console.log(error)
		);
	}

	hasGenerated = false;
	hasMerged = false;

	generate() {
		this.hasGenerated = true;
	}

	merge() {
		this.hasMerged = true;
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
					this.getProposals();
				},
				error => console.log(error)
			);
		}
	}

	onPicked(input: HTMLInputElement) {
		const file = input.files[ 0 ];
		if(file) {
			this.proposalService.uploadFile(file, this.proposal, input).subscribe(
				msg => {
					this.message = msg;
				}
			);
		}
	}

	selectFile(event) {
		this.selectedFiles = event.target.files;
		this.selectedInput = event.target.name.toString()
		this.upload();
	}

	upload() {
		this.progress.percentage = 0;

		this.currentFileUpload = this.selectedFiles.item(0);
		this.proposalService.pushFileToStorage(this.currentFileUpload, this.proposal, this.selectedInput).subscribe(event => {
			console.log('File is completely uploaded!');
		});
		this.selectedFiles = undefined;
	}

	/*
	deleteFile(){
		this.proposalService.deleteFile(file).subscribe(
			() => {
				const newFileArray = this.files.map(element => element.proposalId).indexOf(proposal.proposalId);
				this.files.splice(newFileArray, 1);
				this.getProposals();
			},
			error => console.log(error)
		);
	}*/
}
