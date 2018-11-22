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
			fieldset {
				padding: 1rem;
			}

			input {
				margin: 0.5rem;
			}
		</style>
		<app-toast [message]="toast.message"></app-toast>
		<mat-card>
			<mat-card-header>
				<mat-card-title>
					My proposals {{proposals.length}})
				</mat-card-title>
			</mat-card-header>
			<mat-card-content *ngIf="proposals.length === 0">
				There are no proposals in the database. Create a new proposal below.
			</mat-card-content>
			<mat-card-content *ngIf="isEditing">
				<form #form="ngForm" (ngSubmit)="editProposal(proposal)">
					<input class="form-control" type="text" name="experimentTitle"
					       [(ngModel)]="proposal.experimentTitle" placeholder="experimentTitle" required>
					<input class="form-control" type="text" name="briefSummary" [(ngModel)]="proposal.briefSummary"
					       placeholder="Brief summary">
					<input class="form-control" type="text" name="mainProposerFirstName" [(ngModel)]="proposal.mainProposerFirstName"
					       placeholder="First name">
					<input class="form-control" type="text" name="mainProposerLastName" [(ngModel)]="proposal.mainProposerLastName"
					       placeholder="Last name">
					<input class="form-control" type="text" name="mainProposerAffiliation" [(ngModel)]="proposal.mainProposerAffiliation"
					       placeholder="Affiliation">
					<input class="form-control" type="text" name="mainProposerPhone" [(ngModel)]="proposal.mainProposerPhone"
					       placeholder="Phone">
					<input class="form-control" type="text" name="mainProposerEmail" [(ngModel)]="proposal.mainProposerEmail"
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
			</mat-card-content>
			<mat-card-content *ngIf="!isEditing" style="width:100%;">
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
			</mat-card-content>
			<mat-card-content *ngIf="!isEditing" style="max-width: 50%;">
				<form [formGroup]="proposalForm" (ngSubmit)="onSubmit()">
					<div class="generalInformation">

						<label>
							Experiment title:
							<input type="text" formControlName="experimentTitle" required>
						</label>

						<label>
							Brief summary:
							<input type="text" formControlName="briefSummary">
						</label>
						<h3>Main proposer:</h3>
						<label>
							First name:
							<input type="text" formControlName="mainProposerFirstName">
						</label>
						<label>
							Last name:
							<input type="text" formControlName="mainProposerLastName">
						</label>
						<label>
							Affiliation:
							<input type="text" formControlName="mainProposerAffiliation">
						</label>
						<label>
							Phone:
							<input type="text" formControlName="mainProposerPhone">
						</label>
						<label>
							Email:
							<input type="text" formControlName="mainProposerLastName">
						</label>

						<div formArrayName="coProposers">
							<h3>Co-Proposer(s)</h3>
							<button (click)="addCoProposer()">Add Co-Proposer</button>

							<div *ngFor="let firstName of coProposers.controls; let i=index">
								<!-- The repeated alias template -->
								<label>
									Co-Proposer:
									<input type="text" [formControlName]="i">
								</label>
							</div>
						</div>
						<label>
							<input type="text" formControlName="needByDate">
						</label>
						<!--	<label>
								<input type="file" formControlName="needByDateAttachment">
							</label>
							<label>
								Select lab:
								<select>
									<option value="demax">DEMAX</option>
								</select>
							</label>
							-->
					</div>

					<div formGroupName="crystallization" class="crystallization">
						<h3>Crystallization</h3>
						<label>
							Name of molecule to be crystallized (e.g. superoxide dismutase):
							<input type="text" formControlName="moleculeName">
						</label>
						<label>
							FASTA sequence or Uniprot number:
							<input type="text" formControlName="moleculeIdentifier">
						</label>
						<label>
							Oligomerizarion state? (e.g. homodimer, tetramer etc.):
							<input type="text" formControlName="oligomerizationState">
						</label>
						<!--<label>
							PDB ID of crystal structure (upload reference as pdf):
							<input type="file" formControlName="crystalStructureReferencePDF">
						</label>-->
						<label>
							Does the protein have any co-factors or ligands required for crystallization? Specify:
							<input type="text" formControlName="crystallizationRequirements">
						</label>
						<label>
							Known crystallization precipitant composition (incl. buffer, salt, additives, pH):
							<input type="text" formControlName="crystallizationPrecipitantComposition">
						</label>
						<label>
							What crystallization method, volume, and temperature have you used in the past? (e.g. vapour
							diffusion, 10 L drops, room temperature):
							<input type="text" formControlName="previousCrystallizationExperience">
						</label>
						<label>
							How long do your crystals take to appear?:
							<input type="text" formControlName="estimatedCrystallizationProductionTime">
						</label>
						<label>
							What is the typical size of your crystal (m x m x m):
							<input type="text" formControlName="typicalCrystalSize">
						</label>

						<h3>Details from protein preparation</h3>

						<label>
							Typical yield (mg per liter of culture):
							<input type="text" formControlName="typicalYieldMgPerLiter">
						</label>
						<label>
							Storage conditions (e.g. stable at 4 C or frozen at -20 C):
							<input type="text" formControlName="storageConditions">
						</label>
						<label>
							Stability:
							<input type="text" formControlName="stability">
						</label>
						<label>
							What buffer is your protein in?:
							<input type="text" formControlName="buffer">
						</label>
						<label>
							Is your protein partially or fully deuterated?:
							<input type="text" formControlName="levelOfDeuteration">
						</label>
						<label>
							What protein concentration do you usually use for crystallization:
							<input type="text" formControlName="typicalProteinConcentrationUsed">
						</label>
					</div>
					<hr>
					<h2>(B) BIOLOGICAL DEUTERATION</h2>
					<div formGroupName="biomassDeuteration">
						<h3>Biomass</h3>
						<!--
											<<<<<<label>Select Protein or Biomass (E. coli, yeast)</label>
											<div>
												<label> Protein
						
													<input type="radio" id="protein" name="protein" value="protein">
												</label>
												<label>Biomass
													<input type="radio" id="biomass" name="biomass" value="biomass"></label>
											</div>
											<label>
												Other:
												<input type="text" name="other" id="other">
											</label>
											<div>
												<label>No
													<input type="radio" id="no" formControlName="organismProvidedByUser"
														   name="organismProvidedByUser" value="false"></label>
											</div>
											<label>
												Will user provide the organism for us to grow under deuterated conditions?
											</label>
											<div>
												<label>
													Yes
													<input type="radio" id="yes" formControlName="organismProvidedByUser"
														   name="organismProvidedByUser" value="true">
												</label>
											</div>
											<div>
												<label>No
													<input type="radio" id="no" formControlName="organismProvidedByUser"
														   name="organismProvidedByUser" value="false">
												</label>
											</div>-->
						<label>
							What is the organism?
							<input type="text" formControlName="organismDetails">
						</label>
						<!--	<label>
							Please attach a reference or protocol of culture conditions and media composition (formats accepted
							Word
							doc pdf)
							<input type="file" formControlName="organismReferenceAttachment">
						</label>
						-->
						<label>
							How much material do you need?
							<input type="text" formControlName="amountNeeded">
						</label><label>
						Indicate wet or dry mass:
						<input type="text" formControlName="stateOfMaterial">
					</label><label>
						Justify amount:
						<input type="text" formControlName="amountOfMaterialMotivation">
					</label>
						<!--<label>
						Level of deuteration required:
						<input type="radio" formControlName="deuterationLevelRequired">
					</label>
					-->
						<label>
							Justify level of D incorporation:
							<input type="text" formControlName="deuterationLevelMotivation">
						</label>
					</div>
					<div formGroupName="proteinDeuteration" class="proteinDeuteration">
						<h3>Protein</h3>
						<label>
							Name of molecule to be deuterated (e.g. superoxide dismutase):
							<input type="text" formControlName="moleculeName">
						</label>
						<label>
							FASTA sequence or Uniprot number:
							<input type="text" formControlName="moleculeIdentifier">
						</label>
						<label>
							Molecular weight (kDA):
							<input type="text" formControlName="molecularWeight">
						</label>
						<label>
							Oligomerizarion state? (e.g. homodimer, tetramer etc.):
							<input type="text" formControlName="oligomerizationState">
						</label>
						<label>
							Does the protein have any co-factors or ligands required for expression? Specify:
							<input type="text" formControlName="expressionRequirements">
						</label>
						<label>
							Origin of molecules (e.g. human, E. coli, S. cerevisiae):
							<input type="text" formControlName="moleculeOrigin">
						</label>
						<!--<label>
							Will you provide an expression plasmid?
							<input type="radio" formControlName="expressionPlasmidProvidedByUser">
						</label>-->
						<label>
							If “yes”, please provide details (e.g. pET31b, C-terminal His-tag, Amp selection):
							(If “no”, we will design & order a plasmid commercially)
							<input type="text" formControlName="details">
						</label>
						<label>
							How much material do you need:
							<input type="text" formControlName="amountNeeded">
						</label>
						<label>
							Justify amount:
							<input type="text" formControlName="amountNeededMotivation">
						</label>
						<label>
							Level of deuteration required
							<input type="text" formControlName="deuterationLevelRequired">
						</label>
						<label>
							Justify level of D incorporation:
							<input type="text" formControlName="deuterationLevelMotivation">
						</label>
						<!--	<label>
								Will you need DEMAX to purify the protein from deuterated biomass?
								<input type="radio" formControlName="needsPurificationSupport">
							</label>-->
						<!--<label>
							If “yes”, please attach reference or protocol as PDF
							<input type="file" formControlName="needsPurificationSupportAttachment">
						</label>-->
						<label>
							Has expression been done for the unlabeled protein?
							<input type="text" formControlName="hasDoneUnlabeledProteinExpression">
							<input type="text" placeholder="Typical yield">
						</label>
						<!--<label>
							Have you been able to purify the unlabeled protein?
							Please include chromatogram & image of SDS-PAGE in proposal.
							<input type="radio" formControlName="hasPurifiedUnlabeledProtein">
						</label>
						<label>
							Have you tried to deuterate the protein yourself, even in small scale?
							<input type="radio" formControlName="hasProteinDeuterationExperience">
						</label>-->
					</div>

					<div formGroupName="chemicalDeuteration" class="chemicalDeuteration">
						<h2>(C) CHEMICAL DEUTERATION</h2>
						<label>
							Molecule/s to be deuterated (name):
							<input type="text" formControlName="moleculeName">
						</label>
						<label>
							Amount of material required (mass):
							<input type="text" formControlName="amount">
						</label>
						<label>
							Justify amount:
							<input type="text" formControlName="amountMotivation">
						</label>
						<label>
							Indicate percentage and location of deuteration:
							<input type="text" formControlName="deuterationLocationAndPercentage">
						</label>
						<label>
							Justify level of deuteration:
							<input type="text" formControlName="deuterationLevelMotivation">
						</label>
						<!--	<label>
								Attach chemical structure:
								<input type="file" formControlName="chemicalStructure">
							</label>
							<label>
								Has this molecule (or an unlabeled/isotopic analogue) been prepared by yourself or others?
								<input type="radio" formControlName="hasPreviousProductionExperience">
							</label>
							<label>
								If “yes”, please provide protocol (attach a reference PDF if published):
								<input type="file" formControlName="hasPreviousProductionExperienceAttachment">
							</label>-->
					</div>

					<button type="submit" [disabled]="!proposalForm.valid">Submit</button>
				</form>
			</mat-card-content>
		</mat-card>
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
