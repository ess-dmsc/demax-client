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
			scienceScore: [ '' ],
			comments: this.formBuilder.array([ this.initComment() ])
		});

		this.currentProposalId = this.activatedRoute.snapshot.params.proposalId;
		this.proposalService.getProposalByProposalId(this.currentProposalId)
		.subscribe(
			response => {
				console.log(response)
				this.proposal = response;
				this.proposalForm.patchValue(this.proposal);
								let commentArray = <FormArray>this.proposalForm.controls[ 'comments' ];
								for(let i = 1; i < this.proposal.comments.length; i++) {
									commentArray.push(this.formBuilder.group({
										author: this.proposal.comments[ i ].author,
										dateCreated: this.proposal.comments[ i ].dateCreated,
										comment: this.proposal.comments[ i ].comment
									}))
								}

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

	initComment() {
		return new FormGroup({
			author: new FormControl('', [ Validators.required ]),
			dateCreated: new FormControl('', [ Validators.required ]),
			comment: new FormControl('', [ Validators.required ]),
		});
	}

	public addComment() {
		(<FormArray>this.proposalForm.get('comments')).controls.forEach((group: FormGroup) => {
			(<any>Object).values(group.controls).forEach((control: FormControl) => {
				control.markAsTouched();
			})
		});
		const commentControl = <FormArray>this.proposalForm.get('comments');
		commentControl.push(this.initComment());
		this.message.setSpecialMessage('Added', 'success');
	}

	getComments(proposalForm) {
		return proposalForm.controls.comments.controls;
	}

	public deleteComment(i) {
		const control = <FormArray>this.proposalForm.get('comments');
		control.removeAt(i);
	}


	getCommentsGroupControl(index, fieldName) {
		return (<FormArray>this.proposalForm.get('comments')).at(index).get(fieldName);
	}

}
