import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ProposalService } from '../proposal.service';
import { ToastComponent } from '../components/toast/toast.component';
import { Proposal } from '../proposal';

@Component({
	selector: 'app-proposals',
	template: `
		<style>
			mat-form-field {
				width: 80%;
			}

			mat
		</style>
		<app-toast [message]="toast.message"></app-toast>
		
		<section *ngIf="proposals.length === 0">
			There are no proposals in the database. Create a new proposal below.
		</section>
		<section *ngIf="isEditing">
			<form #form="ngForm" (ngSubmit)="editProposal(proposal)">
				<input class="form-control" type="text" name="experimentTitle"
				       [(ngModel)]="proposal.experimentTitle" placeholder="experimentTitle" required>
				<input class="form-control" type="text" name="briefSummary" [(ngModel)]="proposal.briefSummary"
				       placeholder="Brief summary">
				<input class="form-control" type="text" name="mainProposerFirstName"
				       [(ngModel)]="proposal.mainProposerFirstName"
				       placeholder="First name">
				<input class="form-control" type="text" name="mainProposerLastName"
				       [(ngModel)]="proposal.mainProposerLastName"
				       placeholder="Last name">
				<input class="form-control" type="text" name="mainProposerAffiliation"
				       [(ngModel)]="proposal.mainProposerAffiliation"
				       placeholder="Affiliation">
				<input class="form-control" type="text" name="mainProposerPhone"
				       [(ngModel)]="proposal.mainProposerPhone"
				       placeholder="Phone">
				<input class="form-control" type="text" name="mainProposerEmail"
				       [(ngModel)]="proposal.mainProposerEmail"
				       placeholder="Email">
				<input class="form-control" type="text" name="coProposers" [(ngModel)]="proposal.coProposers"
				       placeholder="Co-proposer(s)">
				<input class="form-control" type="text" name="lab" [(ngModel)]="proposal.lab"
				       placeholder="lab">
				<input class="form-control" type="text" name="needByDate" [(ngModel)]="proposal.needByDate"
				       placeholder="'Need-by-date'">
				<button class="btn btn-sm btn-primary mr-2" type="submit" [disabled]="!form.form.valid">
					<i class="fa fa-floppy-o"></i> Save
				</button>
				<button class="btn btn-sm btn-warning" (click)="cancelEditing()">
					<i class="fa fa-times"></i> Cancel
				</button>
			</form>
		</section>
		<section *ngIf="!isEditing">
			<table style="width:100%;">
				<tr>
					<td>ID</td>
					<td>Title</td>
					<td>Created</td>
					<td>Options</td>
				</tr>
				<tr *ngFor="let proposal of proposals">
					<td>{{proposal._id}}</td>
					<td>{{proposal.experimentTitle}}</td>
					<td>
						<button class="btn btn-sm btn-primary" (click)="enableEditing(proposal)">
							<i class="fa fa-pencil"></i> Edit
						</button>
					</td>
					<td>
						<button class="btn btn-sm btn-danger ml-1" (click)="deleteProposal(proposal)">
							<i class="fa fa-trash"></i> Delete
						</button>
					</td>
				</tr>
			</table>
		</section>
		<section *ngIf="!isEditing">
			<form [formGroup]="proposalForm" (ngSubmit)="onSubmit()">
				<mat-tab-group mat-align-tabs="center">
					<mat-tab label="1. General information">
						<h2>General information</h2>
						<mat-form-field>
							<input matInput formControlName="experimentTitle" placeholder="Experiment title">
						</mat-form-field>
						<mat-form-field>
							<textarea matInput formControlName="briefSummary"
							          placeholder="Brief summary"></textarea>
						</mat-form-field>
						<mat-divider></mat-divider>
						<h3>Main proposer</h3>
						<mat-form-field>
							<input matInput formControlName="mainProposerFirstName" placeholder="First name">
						</mat-form-field>
						<mat-form-field>
							<input matInput formControlName="mainProposerLastName" placeholder="Last name">
						</mat-form-field>
						<mat-form-field>
							<input matInput formControlName="mainProposerAffiliation" placeholder="Affiliation">
						</mat-form-field>
						<mat-form-field>
							<input matInput formControlName="mainProposerPhone" placeholder="phone">
						</mat-form-field>
						<mat-form-field>
							<input matInput formControlName="mainProposerEmail" placeholder="email">
						</mat-form-field>
						<mat-divider></mat-divider>
						<div formArrayName="coProposers" style="padding:3rem auto;">
							<h3>Co-Proposer(s)</h3>
							<div *ngFor="let firstName of coProposers.controls; let i=index">
								<mat-form-field>
									<input matInput [formControlName]="i">
								</mat-form-field>
							</div>
							<button mat-button style="background-color: #005CBF; color: white;"
							        (click)="addCoProposer()">Add Co-Proposer
							</button>
						</div>
						<mat-divider></mat-divider>
						<h3>Scheduling</h3>

						<mat-form-field>
							<p>Motivate “need by” date (e.g. based on awarded beamtime, or described intention to
								apply):</p>
							<input matInput formControlName="needByDate" placeholder="">
						</mat-form-field>
						<fieldset>
							<p>
								Upload copy of beamtime proposal as PDF
							</p>
							<app-upload></app-upload>
						</fieldset>

						<mat-divider></mat-divider>
						<mat-form-field>
							<p>Select which lab/instrument you wish to apply to:</p>
							<mat-select formControlName="lab">
								<mat-option value="DEMAX">DEMAX</mat-option>
								<mat-option value="FLUCO">FLUCO</mat-option>
								<mat-option value="MESI">MESI</mat-option>
								<mat-option value="PREMP">PREMP</mat-option>
								<mat-option value="SCUO">SCUO</mat-option>
								<mat-option value="SULFI">SULFI</mat-option>
								<mat-option value="TEFI">TEFI</mat-option>
							</mat-select>
						</mat-form-field>
						<p>In the next sections you will fill out the applicable area of support your proposal requires.
							Select one, or as many as apply, from (A) Crystallization, (B) Biological Deuteration, (C)
							Chemical Deuteration.</p>
						<button mat-raised-button onclick="editProposal()">Save</button>
					</mat-tab>
					<mat-tab label="2. Deuteration details">
						<div formGroupName="crystallization" class="crystallization">
							<h3>Crystallization</h3>
							<mat-form-field>
								<p>Name of molecule to be crystallized (e.g. superoxide dismutase)</p>
								<textarea matInput formControlName="moleculeName"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>FASTA sequence or Uniprot number</p>
								<textarea matInput formControlName="moleculeIdentifier"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>Oligomerizarion state? (e.g. homodimer, tetramer etc.)</p>
								<textarea matInput formControlName="oligomerizationState"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>Does the protein have any co-factors or ligands required for crystallization?
									Specify:</p>
								<textarea matInput formControlName="crystallizationRequirements"></textarea>
							</mat-form-field>
							<fieldset>
								<p>PDB ID of crystal structure (upload reference as pdf)</p>
								<app-upload></app-upload>
							</fieldset>
							<mat-form-field>
								<p>Known crystallization precipitant composition (incl. buffer, salt, additives, pH)</p>
								<textarea matInput formControlName="crystallizationPrecipitantComposition"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>What crystallization method, volume, and temperature have you used in the past? (e.g.
									vapour diffusion, 10 L drops, room temperature)</p>
								<textarea matInput formControlName="previousCrystallizationExperience"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>How long do your crystals take to appear?:</p>
								<textarea matInput formControlName="estimatedCrystallizationProductionTime"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>What is the typical size of your crystal (m x m x m):</p>
								<textarea matInput formControlName="typicalCrystalSize"></textarea>
							</mat-form-field>
							<mat-divider></mat-divider>
							<h3>Details from protein preparation</h3>
							<mat-form-field>
								<p>Typical yield (mg per liter of culture)</p>
								<textarea matInput formControlName="typicalYieldMgPerLiter"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>Storage conditions (e.g. stable at 4 C or frozen at -20 C)</p>
								<textarea matInput formControlName="storageConditions"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>Stability</p>
								<textarea matInput formControlName="stability"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>What buffer is your protein in?:</p>
								<textarea matInput formControlName="buffer"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>Is your protein partially or fully deuterated?</p>
								<textarea matInput formControlName="levelOfDeuteration"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>What protein concentration do you usually use for crystallization:</p>
								<textarea matInput formControlName="typicalProteinConcentrationUsed"></textarea>
							</mat-form-field>
						</div>
						<hr>
						<h2>(B) BIOLOGICAL DEUTERATION</h2>
						<div formGroupName="biomassDeuteration">
							<h3>Biomass</h3>
							<fieldset>
								<p>Select Protein or Biomass (E. coli, yeast)</p>
								<mat-radio-group>
									<mat-radio-button value="protein">Protein</mat-radio-button>
									<mat-radio-button value="biomass">Biomass</mat-radio-button>
									<mat-radio-button value="other">Other</mat-radio-button>
								</mat-radio-group>
							</fieldset>
							<fieldset>
								<p> Will user provide the organism for us to grow under deuterated conditions?
								</p>
								<mat-radio-group formControlName="organismProvidedByUser">
									<mat-radio-button value="yes">Yes</mat-radio-button>
									<mat-radio-button value="no">No</mat-radio-button>
								</mat-radio-group>
							</fieldset>
							<mat-form-field>
								<p>What is the organism?
								</p>
								<textarea matInput formControlName="organismDetails"></textarea>
							</mat-form-field>
							<fieldset>
								<p>Please attach a reference or protocol of culture conditions and media composition
									(formats accepted
									Word
									doc pdf)
								</p>
								<app-upload></app-upload>
							</fieldset>
							<mat-form-field>
								<p> How much material do you need?
								</p>
								<textarea matInput formControlName="amountNeeded"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p> Indicate wet or dry mass:
								</p>
								<textarea matInput formControlName="stateOfMaterial"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p> Justify amount:
								</p>
								<textarea matInput formControlName="amountOfMaterialMotivation"></textarea>
							</mat-form-field>
							<mat-radio-group formControlName="deuterationLevelRequired">
								<p> Level of deuteration required:
								</p>
								<mat-radio-button value="partial">Partial (65-80% with unlabeled carbon source)
								</mat-radio-button>
								<mat-radio-button value="full">Full (~99% with labeled carbon source)</mat-radio-button>
							</mat-radio-group>
							<mat-form-field>
								<p> Justify level of D incorporation:
								</p>
								<textarea matInput formControlName="deuterationLevelMotivation"></textarea>
							</mat-form-field>
						</div>
						<mat-divider></mat-divider>
						<div formGroupName="proteinDeuteration">
							<h3>Protein</h3>

							<mat-form-field>
								<p> Name of molecule to be deuterated (e.g. superoxide dismutase):
								</p>
								<textarea matInput formControlName="moleculeName"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p> FASTA sequence or Uniprot number:
								</p>
								<textarea matInput formControlName="moleculeIdentifier"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p> Molecular weight (kDA):
								</p>
								<textarea matInput formControlName="molecularWeight"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p> Oligomerizarion state? (e.g. homodimer, tetramer etc.):
								</p>
								<textarea matInput formControlName="oligomerizationState"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p> Does the protein have any co-factors or ligands required for expression? Specify:
								</p>
								<textarea matInput formControlName="expressionRequirements"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p> Origin of molecules (e.g. human, E. coli, S. cerevisiae):
								</p>
								<textarea matInput formControlName="moleculeOrigin"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>If “yes”, please provide details (e.g. pET31b, C-terminal His-tag, Amp selection):
									(If “no”, we will design & order a plasmid commercially)</p>
								<textarea matInput formControlName="details"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p> How much material do you need:
								</p>
								<textarea matInput formControlName="amountNeeded"></textarea>
							</mat-form-field>

							<mat-radio-group formControlName="expressionPlasmidProvidedByUser">
								<p>Will you provide an expression plasmid?</p>
								<mat-radio-button value="yes">Yes</mat-radio-button>
								<mat-radio-button value="no">No</mat-radio-button>
							</mat-radio-group>
							<mat-form-field>
								<p>
									Justify amount:

								</p>
								<textarea matInput formControlName="amountNeededMotivation"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>
									Level of deuteration required

								</p>
								<textarea matInput formControlName="deuterationLevelRequired"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>
									Justify level of D incorporation:

								</p>
								<textarea matInput formControlName="deuterationLevelMotivation"></textarea>
							</mat-form-field>
							<mat-radio-group formControlName="needsPurificationSupport">
								<p>Will you need DEMAX to purify the protein from deuterated biomass?</p>
								<mat-radio-button value="yes">Yes</mat-radio-button>
								<mat-radio-button value="no">No</mat-radio-button>
							</mat-radio-group>
							<fieldset>
								<p>
									If “yes”, please attach reference or protocol as PDF
								</p>
								<app-upload></app-upload>
							</fieldset>

							<mat-radio-group formControlName="hasDoneUnlabeledProteinExpression">
								<p>Has expression been done for the unlabeled protein?</p>
								<mat-radio-button value="yes">Yes</mat-radio-button>
								<mat-radio-button value="no">No</mat-radio-button>
								<input type="text" placeholder="Typical yield">
							</mat-radio-group>
							<mat-radio-group formControlName="hasPurifiedUnlabeledProtein">
								<p> Have you been able to purify the unlabeled protein?
								</p>
								<mat-radio-button value="yes">Yes</mat-radio-button>
								<mat-radio-button value="no">No</mat-radio-button>
								<p> Please include chromatogram & image of SDS-PAGE in proposal.
								</p>
							</mat-radio-group>
							<mat-radio-group formControlName="hasProteinDeuterationExperience">
								<p>
									Have you tried to deuterate the protein yourself, even in small scale?
									<mat-radio-button value="yes">Yes</mat-radio-button>
									<mat-radio-button value="no">No</mat-radio-button>

								</p>
								<input type="text" placeholder="Results?">
							</mat-radio-group>
						</div>
						<div formGroupName="chemicalDeuteration" class="chemicalDeuteration">
							<h2>(C) CHEMICAL DEUTERATION</h2>
							<mat-form-field>
								<p>
									Molecule/s to be deuterated (name):

								</p>
								<textarea matInput formControlName="moleculeName"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>
									Amount of material required (mass):

								</p>
								<textarea matInput formControlName="amount"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>
									Justify amount:

								</p>
								<textarea matInput formControlName="amountMotivation"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>
									Indicate percentage and location of deuteration:

								</p>
								<textarea matInput formControlName="deuterationLocationAndPercentage"></textarea>
							</mat-form-field>
							<mat-form-field>
								<p>
									Justify level of deuteration:

								</p>
								<textarea matInput formControlName="deuterationLevelMotivation"></textarea>
							</mat-form-field>
							<fieldset>
								<p> Attach chemical structure:
								</p>
								<app-upload></app-upload>
							</fieldset>
							<mat-radio-group formControlName="hasPreviousProductionExperience">
								<p>
									Has this molecule (or an unlabeled/isotopic analogue) been prepared by yourself or
									others?

								</p>
								<mat-radio-button value="yes">Yes</mat-radio-button>
								<mat-radio-button value="no">No</mat-radio-button>
								<p> If “yes”, please provide protocol (attach a reference PDF if published):
								</p>
								<app-upload></app-upload>
							</mat-radio-group>

						</div>
						<button type="submit" [disabled]="!proposalForm.valid">Submit</button>

					</mat-tab>
					<mat-tab label="3. Review & submit">

					</mat-tab>
				</mat-tab-group>


			</form>
		</section>
	`
})
export class ProposalsComponent implements OnInit {
	proposal = new Proposal();
	proposals: Proposal[] = [];
	isLoading = true;
	isEditing = false;

	proposalForm = this.formBuilder.group({
		experimentTitle: [ '' ],
		briefSummary: [ '' ],
		mainProposerFirstName: [ '' ],
		mainProposerLastName: [ '' ],
		mainProposerAffiliation: [ '' ],
		mainProposerEmail: [ '' ],
		mainProposerPhone: [ '' ],
		coProposers: this.formBuilder.array([
			this.formBuilder.control('')
		]),
		needByDate: [ '' ],
		needByDateAttachment: [ '' ],
		lab: [ '' ],
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
		public toast: ToastComponent
	) {
	}

	get coProposers() {
		return this.proposalForm.get('coProposers') as FormArray;
	}

	addCoProposer() {
		this.coProposers.push(this.formBuilder.control(''));
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
	}

	getProposals() {
		this.proposalService.getProposals().subscribe(
			data => this.proposals = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	addProposal() {
		this.proposalService.addProposal(this.proposalForm.value).subscribe(
			res => {
				this.proposals.push(res);
				this.proposalForm.reset();
				this.toast.setMessage('proposal created successfully.', 'success');
			},
			error => console.log(error)
		);
	}

	enableEditing(proposal: Proposal) {
		this.isEditing = true;
		this.proposal = proposal;
	}

	cancelEditing() {
		this.isEditing = false;
		this.proposal = new Proposal();
		this.toast.setMessage('proposal editing cancelled.', 'warning');
		// reload the proposals to reset the editing
		this.getProposals();
	}

	editProposal(proposal: Proposal) {
		this.proposalService.editProposal(proposal).subscribe(
			() => {
				this.isEditing = false;
				this.proposal = proposal;
				this.toast.setMessage('proposal updated successfully.', 'success');
			},
			error => console.log(error)
		);
	}

	deleteProposal(proposal: Proposal) {
		if(window.confirm('Are you sure you want to permanently delete this proposal?')) {
			this.proposalService.deleteProposal(proposal).subscribe(
				() => {
					const pos = this.proposals.map(elem => elem._id).indexOf(proposal._id);
					this.proposals.splice(pos, 1);
					this.toast.setMessage('proposal deleted successfully.', 'success');
				},
				error => console.log(error)
			);
		}
	}

}