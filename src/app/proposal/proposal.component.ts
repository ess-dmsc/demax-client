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
	templateUrl: './proposal.component.html',
	styleUrls: ['./proposal.component.css']
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
			proposalId: '',
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
