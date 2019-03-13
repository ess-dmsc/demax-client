import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Proposal } from "../../models/proposal";
import { ProposalService } from "../proposal.service";
import { AuthService } from "../../user/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageComponent } from "../../shared/message/message.component";
import { FileService } from "../../file/file.service";
import { APP_CONFIG, AppConfig } from "../../app-config.module";
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-proposal-detail',
	templateUrl: './proposal-detail.component.html',
	styleUrls: [ './proposal-detail.component.css' ]
})
export class ProposalDetailComponent implements OnInit {

	url = this.appConfig.demaxBaseUrl;
	proposal: Proposal;
	proposalForm: FormGroup;
	coProposers: FormArray;
	selectedIndex = 0;

	isLoading = true;
	isEditing = false;
	isCreating = false;
	isUploading = false;
	isGenerating = false;
	currentProposalId: string;

	attachmentType: string;
	progress: { percentage: number } = {percentage: 0};

	crystallization = false;
	proteinDeuteration = false;

	fileUploads: Observable<Object[]>;

	step = 0;


	selectTab(index: number): void {
		window.scrollTo(0, 0)
		event.preventDefault();
		this.save();
		this.selectedIndex = index;
		this.progress.percentage = 0;
		this.fileUploads = this.fileService.getFiles(this.proposalForm.controls[ 'proposalId' ].value);
	}

	back(): void {
		window.scrollTo(0, 0)
		event.preventDefault();
		this.save();
		this.selectedIndex = this.selectedIndex - 1;
		this.progress.percentage = 0;
		this.fileUploads = this.fileService.getFiles(this.proposalForm.controls[ 'proposalId' ].value);
	}

	forward(): void {
		window.scrollTo(0, 0)
		event.preventDefault();
		this.save();
		this.selectedIndex = this.selectedIndex + 1;
		this.progress.percentage = 0;
		this.fileUploads = this.fileService.getFiles(this.proposalForm.controls[ 'proposalId' ].value);
	}


	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		private proposalService: ProposalService,
		private fileService: FileService,
		private formBuilder: FormBuilder,
		public auth: AuthService,
		public activatedRoute: ActivatedRoute,
		public router: Router,
		private message: MessageComponent,
		private _snackbar: MatSnackBar,
		private sanitizer: DomSanitizer,
		private http: HttpClient
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
			coProposers: this.formBuilder.array([]),
			needByDate: [ '', Validators.required ],
			needByDateMotivation: [ '', Validators.required ],
			lab: [ '', Validators.required ],
			linksWithIndustry: [ '', Validators.required ],
			linksWithIndustryDetails: [ '' ],
			coProposerStudents: [ '', Validators.required ],
			workTowardsStudentsDegree: [ '', Validators.required ],
			wantsCrystallization: false,
			wantsBiologicalDeuteration: false,
			wantsBiomassDeuteration: false,
			wantsYeastDeuteration: false,
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

		this.currentProposalId = this.activatedRoute.snapshot.params.proposalId;

		if(this.currentProposalId === 'new') {
			this.isCreating = true;
			this.proposalService.addProposal(this.proposalForm.value)
			.subscribe(
				response => {
					this.proposal = response;
					this.proposalForm.setValue(response);
					this.message.setMessage('New proposal created!', 'success');
					this.isLoading = false;
				},
				error => {
					console.log(error)
				}
			)
		}
		else {
			this.getProposal();
			this.fileUploads = this.fileService.getFiles(this.proposalForm.controls[ 'proposalId' ].value);
		}
	}

	getProposal() {
		this.proposalService.getProposalByProposalId(this.currentProposalId).subscribe(
			response => {
				this.proposal = response;
				this.proposalForm.patchValue(this.proposal);
				this.isEditing = true;
				this.fileUploads = this.fileService.getFiles(this.proposalForm.controls[ 'proposalId' ].value);
				this.message.setMessage('Editing proposal ' + this.proposal.proposalId, 'success');
				this.isLoading = false;
			}
		)
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

	addCoProposer() {
		event.preventDefault();
		const coProposer = this.proposalForm.controls.coProposers as FormArray;
		coProposer.push(this.formBuilder.group({
			firstName: [],
			lastName: [],
			affiliation: [],
			email: []
		}));
	}

	createNewCoProposer(){
		const coProposer = this.coProposerForms;
		coProposer.push(this.formBuilder.group({
			firstName: '',
			lastName: '',
			affiliation: '',
			email: ''
		}))
		console.log(coProposer);
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
		this.coProposerForms.removeAt(i);
		console.log(this.coProposerForms.length)
	}

	get coProposerForms() {
		return this.proposalForm.get('coProposers') as FormArray;
	}

	getFiles(uploaded) {
		this.fileUploads = this.fileService.getFiles(this.proposal.proposalId);
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

	enableUploading() {
		this.isUploading = true;
	}

	disableUploading() {
		this.isUploading = false;
	}

	showSnackbar() {
		this._snackbar.open('YUM SNACKS', 'CHEW');
	}
}
