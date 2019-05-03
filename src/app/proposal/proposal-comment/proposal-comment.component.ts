import { Component, OnInit, Input } from '@angular/core';
import { ProposalService } from "../proposal.service";
import { MessageComponent } from "../../shared/message/message.component";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: 'app-proposal-comment',
	templateUrl: './proposal-comment.component.html',
	styleUrls: [ './proposal-comment.component.css' ]
})
export class ProposalCommentComponent implements OnInit {

	@Input() proposalId: string;
	isLoading = false;
	comments: Observable<Object[]>;
	commentId: string;
	currentProposalId: string;

	constructor(
		public activatedRoute: ActivatedRoute,
		private proposalService: ProposalService,
		public message: MessageComponent
	) {

	}

	ngOnInit() {
		this.currentProposalId = this.activatedRoute.snapshot.params.proposalId;

		this.comments = this.proposalService.getComments(this.currentProposalId);
		console.log(this.currentProposalId)
		console.log(this.comments)
	}

	/*deleteComment(commentId: string, proposalId: string){
		this.isLoading = true;
		this.proposalService.deleteComment().subscribe(
			() =>{
				this.comments = this.proposalService.getComments(this.proposalId);
			}, error =>{
				console.log(error)
			}
		)
		this.isLoading = false;
	}*/
}
