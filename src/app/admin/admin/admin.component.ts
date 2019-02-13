import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { Proposal } from "../../models/proposal";
import { AuthService } from "../../user/auth.service";
import { UserService } from "../../user/user.service";
import { ProposalService } from "../../proposal/proposal.service";

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: [ './admin.component.css' ]
})
export class AdminComponent implements OnInit {

	users: User[] = [];
	proposals: Proposal[] = [];

	isLoading = true;
	displayedUserColumns: string[] = [ 'firstName', 'lastName', 'phone', 'email', 'role', 'options' ];
	displayedProposalColumns: string[] = [ 'proposalId', 'experimentTitle', 'options' ]

	constructor(
		public auth: AuthService,
		private userService: UserService,
		private proposalService: ProposalService
	) {
	}

	ngOnInit() {
		this.getUsers();
		console.log(this.users);
		this.getProposals();
		console.log(this.proposals)
	}

	getProposals() {
		this.proposalService.adminGetProposals().subscribe(
			data => this.proposals = data,
			error => console.log(error),
			() => this.isLoading = false
		)
	}

	getUsers() {
		this.userService.getUsers().subscribe(
			data => this.users = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	editUser(user: User) {
		this.userService.editUser(user).subscribe(
			() => this.getUsers()
		)
	}

	deleteUser(user: User) {
		if(window.confirm('Are you sure you want to delete ' + user.email + '?')) {
			this.userService.deleteUser(user).subscribe(
				() => this.getUsers()
			);
		}
	}

	deleteProposal(proposal: Proposal) {
		if(window.confirm('Are you sure you want to delete ' + proposal.mainProposer.email + '?')) {
			this.proposalService.deleteProposal(proposal).subscribe(
				() => this.getProposals()
			);
		}
	}

}