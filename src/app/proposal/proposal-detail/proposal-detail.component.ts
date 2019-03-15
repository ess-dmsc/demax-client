import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Proposal } from "../../models/proposal";
import { APP_CONFIG, AppConfig } from "../../app-config.module";
import { ProposalService } from "../proposal.service";
import { FileService } from "../../file/file.service";
import { AuthService } from "../../user/auth.service";
import { MessageComponent } from "../../shared/message/message.component";

import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: 'app-proposal-detail',
	templateUrl: './proposal-detail.component.html',
	styleUrls: [ './proposal-detail.component.css' ]
})
export class ProposalDetailComponent implements OnInit {

	fileUploads: Observable<Object[]>;

	proposal: Proposal;
	proposalForm: FormGroup;
	currentProposalId: string;

	isLoading = true;
	isEditing = false;
	isCreating = false;
	isGenerating = false;

	selectedIndex = 0;

	step = 0;

	setStep(index: number) {
		console.log(event.target)
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		public activatedRoute: ActivatedRoute,
		public auth: AuthService,
		private fileService: FileService,
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private message: MessageComponent,
		private proposalService: ProposalService,
		public router: Router,
	) {
	}

	createProposalForm() {
		return this.proposalForm = this.formBuilder.group({
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
			coProposers: this.formBuilder.array([ this.initCoProposer() ]),
			needByDate: [ '', Validators.required ],
			needByDateMotivation: [ '', Validators.required ],
			lab: [ '', Validators.required ],
			linksWithIndustry: [ '', Validators.required ],
			linksWithIndustryDetails: [ '' ],
			coProposerStudents: [ '', Validators.required ],
			workTowardsStudentsDegree: [ '', Validators.required ],
			wantsCrystallization: [ false ],
			wantsBiologicalDeuteration: [ false ],
			wantsBiomassDeuteration: [ false ],
			wantsYeastDeuteration: [ false ],
			wantsProteinDeuteration: [ false ],
			wantsOtherDeuteration: [ false ],
			wantsChemicalDeuteration: [ false ],
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
				amountNeededMotivation: [ '' ],
				deuterationLevelRequired: [ '' ],
				deuterationLevelMotivation: [ '' ],
				other: [ '' ]
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
			yeastDeuteration: this.formBuilder.group({
				amountNeeded: [ '' ],
				amountNeededMotivation: [ '' ],
				deuterationLevelRequired: [ '' ],
				deuterationLevelMotivation: [ '' ]
			}),
			bioSafety: this.formBuilder.group({
				proteinIsRecombinant: [ '' ],
				sampleIsToxin: [ '' ],
				sampleIsVirulenceFactor: [ '' ],
				sampleIsPrionProtein: [ '' ],
				sampleHasHazardousLigand: [ '' ],
				sampleActivity: [ '' ],
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
	}

	ngOnInit() {
		this.proposalForm = this.createProposalForm();

		this.currentProposalId = this.activatedRoute.snapshot.params.proposalId;

		if(this.currentProposalId === 'new') {
			this.isCreating = true;
			this.proposalService.addProposal(this.proposalForm.value)
			.subscribe(
				response => {
					console.log(response);
					this.proposal = response;
					this.proposalForm.patchValue(this.proposal);
					this.isLoading = false;
				},
				error => {
					console.log(error)
				}
			)
		}

		else {
			this.isEditing = true;
			this.proposalService.getProposalByProposalId(this.currentProposalId)
			.subscribe(
				response => {
					this.proposal = response;
					this.proposalForm.patchValue(this.proposal);
					this.getFiles();
					let controlArray = <FormArray>this.proposalForm.controls[ 'coProposers' ];
					for(let i = 1; i < this.proposal.coProposers.length; i++) {
						controlArray.push(this.formBuilder.group({
							firstName: this.proposal.coProposers[ i ].firstName,
							lastName: this.proposal.coProposers[ i ].lastName,
							email: this.proposal.coProposers[ i ].email,
							affiliation: this.proposal.coProposers[ i ].affiliation
						}))
					}
					this.isLoading = false;
				},
				error => {
					console.log(error)
				}
			)
		}
	}

	getFiles() {
		this.fileUploads = this.fileService.getFiles(this.proposal.proposalId);
	}

	save() {
		this.proposalService.editProposal(this.proposalForm.value)
		.subscribe(
			data => {
				this.message.setMessage('Saved!', 'success');
			},
			error => {
				console.log(error)
			}
		);
	}

	initCoProposer() {
		return new FormGroup({
			firstName: new FormControl('', [ Validators.required ]),
			lastName: new FormControl('', [ Validators.required ]),
			email: new FormControl('', [ Validators.required ]),
			affiliation: new FormControl('', [ Validators.required ])
		});
	}

	public addCoProposer() {
		(<FormArray>this.proposalForm.get('coProposers')).controls.forEach((group: FormGroup) => {
			(<any>Object).values(group.controls).forEach((control: FormControl) => {
				control.markAsTouched();
			})
		});
		const coProposerControl = <FormArray>this.proposalForm.get('coProposers');
		coProposerControl.push(this.initCoProposer());
		this.message.setSpecialMessage('Added', 'success');
	}

	getCoProposers(proposalForm) {
		return proposalForm.controls.coProposers.controls;
	}

	public deleteCoProposer(i) {
		const control = <FormArray>this.proposalForm.get('coProposers');
		control.removeAt(i);
	}


	getGroupControl(index, fieldName) {
		return (<FormArray>this.proposalForm.get('coProposers')).at(index).get(fieldName);
	}


	back(): void {
		event.preventDefault();
		this.selectedIndex = this.selectedIndex - 1;
		window.scrollTo(0, 0);
		this.save();
	}

	forward(): void {
		event.preventDefault();
		this.selectedIndex = this.selectedIndex + 1;
		window.scrollTo(0, 0);
		this.save();
	}

	delete(filename: string, input: string) {
		this.proposalService.deleteFile(filename, this.proposal, input).subscribe(
			() => {
				this.fileUploads = this.fileService.getFiles(this.proposal.proposalId);
			}, error => {
				console.log(error)
			}
		);
	}

	generatePdf(): void {
		this.isGenerating = true;
		this.http.get('/api/generate/' + this.proposal.proposalId, {responseType: 'blob' as 'json'}).subscribe(
			(response: any) => {
				let dataType = response.type;
				let binaryData = [];
				binaryData.push(response);
				let downloadLink = document.createElement('a');
				downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));

				document.body.appendChild(downloadLink);
				downloadLink.click();
				window.open(downloadLink.href, '_blank');
				this.isGenerating = false;
			}, error => {
				this.message.setMessage('Failed to generate PDF. Please upload all required files', 'danger');
			}
		)
	}

	submitProposal() {
		if(window.confirm('Are you sure you want to submit?')) {
			this.proposalService.submitProposal(this.proposal.proposalId)
			.subscribe(
				response => {
					if(response === HttpErrorResponse) {
						this.message.setMessage('Error - Please upload all required files before submitting', 'danger');
						console.log()

					} else {
						this.message.setMessage(response, 'success');
						this.router.navigate([ '/proposals' ]);
					}
				}, error => {
					this.message.setMessage('Error - Please upload all required files before submitting', 'danger');
					console.log()
				}
			);
		}
	}
}