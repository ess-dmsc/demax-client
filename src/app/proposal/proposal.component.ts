import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { AuthService } from "../services/auth.service";
import { TestService } from "../services/test.service";

@Component({
	selector: 'app-proposal',
	templateUrl: './proposal.component.html',
	styleUrls: [ './proposal.component.css' ],
	providers: [ TestService ]
})

export class ProposalComponent {
	proposal = new Proposal();
	message: string;

	constructor(
		private proposalService: ProposalService,
		private fb: FormBuilder,
		public auth: AuthService,
		private uploaderService: TestService
	) {
	}


	proposalForm = this.fb.group({
		experimentTitle: [ '' ],
		briefSummary: [ '' ],
		mainProposerFirstName: [ '' ],
		mainProposerLastName: [ '' ],
		mainProposerAffiliation: [ '' ],
		mainProposerEmail: [ '' ],
		mainProposerPhone: [ '' ],
		coProposers: this.fb.array([
			this.fb.control('')
		]),
		needByDate: [ '' ],
		needByDateMotivation: [ '' ],
		needByDateAttachment: [ '' ],
		lab: [ '' ],

		crystallization: this.fb.group({
			moleculeName: [ '' ],
			moleculeIdentifier: [ '' ],
			molecularWeight: [ '' ],
			oligomerizationState: [ '' ],
			pbdId: [ '' ],
			doi: [ '' ],
			pbdIdReferenceAttachment: [ '' ],
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
		biomassDeuteration: this.fb.group({
			organismProvidedByUser: false,
			organismDetails: [ '' ],
			organismReferenceAttachment: [ '' ],
			amountNeeded: [ '' ],
			stateOfMaterial: [ '' ],
			amountOfMaterialMotivation: [ '' ],
			deuterationLevelRequired: [ '' ],
			deuterationLevelMotivation: [ '' ]
		}),
		proteinDeuteration: this.fb.group({
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
		chemicalDeuteration: this.fb.group({
			moleculeName: [ '' ],
			amount: [ '' ],
			amountMotivation: [ '' ],
			deuterationLocationAndPercentage: [ '' ],
			deuterationLevelMotivation: [ '' ],
			chemicalStructure: [ '' ],
			hasPreviousProductionExperience: [ '' ],
			hasPreviousProductionExperienceAttachment: [ '' ]
		}),
		proposalTemplate: [ '' ]
	});

	ngOnInit() {
	}

	get coProposers() {
		return this.proposalForm.get('coProposers') as FormArray;
	}

	addCoProposer() {
		event.preventDefault();
		this.coProposers.push(this.fb.control(''));
	}

	addProposal() {
		this.proposalService.addProposal(this.proposalForm.value).subscribe(
			data =>
			error => console.log(error)
		);
	}


	onPicked(input: HTMLInputElement) {
		const file = input.files[ 0 ];
		console.log(file.name);
		if(file) {
			this.uploaderService.upload(file).subscribe(
				msg => {
					input.value = null;
					this.message = msg;
				}
			);
		}
	}
}
