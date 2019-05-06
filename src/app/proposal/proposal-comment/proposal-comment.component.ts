import { Component, OnInit, Input } from '@angular/core';
import { ProposalService } from "../proposal.service";
import { MessageComponent } from "../../shared/message/message.component";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../user/auth.service";

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

@Component({
	selector: 'app-proposal-comment',
	templateUrl: './proposal-comment.component.html',
	styleUrls: [ './proposal-comment.component.css' ]
})
export class ProposalCommentComponent implements OnInit {

	@Input() proposalId: string;
	isLoading = true;
	comments: Observable<Object[]>;
	commentForm: FormGroup;
	commentId: string;
	currentProposalId: string;

	constructor(
		public activatedRoute: ActivatedRoute,
		private auth: AuthService,
		private proposalService: ProposalService,
		private formBuilder: FormBuilder,
		public message: MessageComponent
	) {

	}

	author = new FormControl(this.auth.currentUser.email);
	comment = new FormControl('', Validators.required);
	proposal = new FormControl(this.currentProposalId)

	ngOnInit() {
		this.currentProposalId = this.activatedRoute.snapshot.params.proposalId;

		this.comments = this.proposalService.getComments(this.currentProposalId);
		this.isLoading = false;
		this.commentForm = this.formBuilder.group({
			comment: this.comment,
			author: this.author,
			proposal: this.currentProposalId
		})
	}

	postComment() {
		console.log(this.commentForm.value)
		this.proposalService.addComment(this.commentForm.value).subscribe(
			response => {
				this.comments = this.proposalService.getComments(this.currentProposalId);
				this.message.setMessage('Posted comment!', 'success')
			},
			error => {
				this.message.setMessage('Error', 'danger')
			}
		)
	}


	deleteComment(commentId: string) {
		this.proposalService.deleteComment(this.currentProposalId, commentId).subscribe(
			response => {
				this.comments = this.proposalService.getComments(this.currentProposalId);
				this.message.setMessage('Deleted comment', 'success')

			}, error => {
				this.message.setMessage('Error', 'danger')
			}
		)
	}
}
