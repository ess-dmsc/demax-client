import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { AuthService } from "../user/auth.service";
import { FileService } from "../file/file.service";
import { MessageComponent } from "../shared/message/message.component";
import { ProposalService } from "../proposal/proposal.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MyErrorStateMatcher } from "../proposal/proposal-detail/proposal-detail.component";
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	FormGroupDirective,
	NgControl,
	NgForm,
	Validators
} from "@angular/forms";
import { Proposal } from "../models/proposal";
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";


@Component({
	selector: 'app-proposal-review',
	templateUrl: './proposal-review.component.html',
	styleUrls: [ './proposal-review.component.css' ]
})
export class ProposalReviewComponent implements OnInit {

	currentProposalId: string;
	url = this.appConfig.demaxBaseUrl;
	fileUploads: Observable<Object[]>;
	matcher = new MyErrorStateMatcher();

	proposal: Proposal;
	proposalForm: FormGroup;

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

	ngOnInit() {

		this.proposalForm = this.formBuilder.group({
			proposalId: [ '' ],
			scienceScore: [ '' ]
		});

		this.currentProposalId = this.activatedRoute.snapshot.params.proposalId;
		this.proposalService.getProposalByProposalId(this.currentProposalId)
		.subscribe(
			response => {
				this.proposal = response;
				this.proposalForm.patchValue(this.proposal);
				/*
								let controlArray = <FormArray>this.proposalForm.controls[ 'coProposers' ];
								for(let i = 1; i < this.proposal.coProposers.length; i++) {
									controlArray.push(this.formBuilder.group({
										firstName: this.proposal.coProposers[ i ].firstName,
										lastName: this.proposal.coProposers[ i ].lastName,
										email: this.proposal.coProposers[ i ].email,
										affiliation: this.proposal.coProposers[ i ].affiliation
									}))
								}
								*/
			},
			error => {
				console.log(error)
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

}
