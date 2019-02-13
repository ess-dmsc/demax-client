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
import { HttpEventType, HttpResponse } from "@angular/common/http";

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

	currentProposalId: string;

	crystallization = false;
	proteinDeuteration = false;

	fileUploads: Observable<Object[]>;

	selectedFiles: FileList;
	attachmentType: string;
	currentFileUpload: File;

	progress: { percentage: number } = {percentage: 0};

	selectTab(index: number): void {
		window.scrollTo(0, 0)
		event.preventDefault();
		this.selectedIndex = index;
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
		public message: MessageComponent
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
			coProposers: this.formBuilder.array([ this.createCoProposer() ]),
			needByDate: [ '', Validators.required ],
			needByDateMotivation: [ '', Validators.required ],
			needByDateAttachment: [ '', Validators.required ],
			lab: [ '', Validators.required ],
			linksWithIndustry: [ '', Validators.required ],
			linksWithIndustryDetails: [ '' ],
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
				hasDoneProteinPurification: [ '' ],
				hasProteinDeuterationExperience: [ '' ],
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
				other: [ '' ]
			}),
			other: [ '' ]
		});

		this.currentProposalId = this.activatedRoute.snapshot.params.proposalId;
		console.log(this.currentProposalId);

		if(this.currentProposalId === 'new') {
			this.isCreating = true;
			this.proposalService.addProposal(this.proposalForm.value)
			.subscribe(
				response => {
					this.proposal = response;
					this.proposalForm.setValue(response);
					console.log('Created new proposal: ' + response.proposalId)
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
				console.log('Editing proposal ' + this.proposal.proposalId);
				this.message.setMessage('Editing proposal ' + this.proposal.proposalId, 'success');
				this.isLoading = false;
			}
		)
	}

	save() {
		this.proposalService.editProposal(this.proposalForm.value)
		.subscribe(
			data => {
				if(data.status === 200) {
					this.message.setMessage('Saved!', 'success');
					this.router.navigate([ '/proposals' ]);
				} else {
					console.log(data);
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	addCoProposer() {
		event.preventDefault();
		const coProposer = this.formBuilder.group({
			firstName: [],
			lastName: [],
			affiliation: [],
			email: []
		});
		this.coProposerForms.push(coProposer);
	}

	createCoProposer()
		:
		FormGroup {
		return this.formBuilder.group({
			firstName: '',
			lastName: '',
			affiliation: '',
			email: ''
		});
	}

	deleteCoProposer(i) {
		console.log(i);
		this.coProposerForms.removeAt(i);
	}

	get coProposerForms() {
		return this.proposalForm.get('coProposers') as FormArray;
	}

	selectFile(event) {
		this.selectedFiles = event.target.files;
		this.attachmentType = event.target.name;
		this.upload();
	}

	getFiles(uploaded) {
		this.fileUploads = this.fileService.getFiles(this.proposal.proposalId);
	}

	upload() {
		this.isLoading = true;
		this.progress.percentage = 0;
		this.currentFileUpload = this.selectedFiles.item(0);

		this.fileService.pushFileToStorage(this.currentFileUpload, this.proposalForm.controls[ 'proposalId' ].value, this.attachmentType).subscribe(
			event => {
				if(event.type === HttpEventType.UploadProgress) {
					this.progress.percentage = Math.round(100 * event.loaded / event.total);
				} else if(event instanceof HttpResponse) {
					console.log('Attachment is completely uploaded!');
					this.message.setMessage(this.currentFileUpload.name + ' was successfully uploaded', 'success');
				}
			},
			error => {
				this.message.setMessage(this.currentFileUpload.name + ' failed to upload', 'danger');

			}
		);
		this.fileUploads = this.fileService.getFiles(this.proposalForm.controls[ 'proposalId' ].value);
		console.log(this.fileUploads);
		this.selectedFiles = undefined;
	}

	delete(filename: string, input: string) {
		console.log(filename)
		console.log(this.proposal.proposalId)
		console.log(input)
		this.fileService.deleteFile(filename, this.proposal, input).subscribe(
			() => {
				this.fileUploads = this.fileService.getFiles(this.proposal.proposalId);
			}, error => {
				console.log(error)
			}
		);
	}
}
