import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from "../models/user";
import { ProposalService } from "../services/proposal.service";
import { Proposal } from "../models/proposal";

@Component({
	selector: 'app-admin',
	template: `
		<style>
			button {
				margin: 0 1rem;
			}

			table {
				width: 100%;
			}
		</style>
		<br>
		<br>
		<mat-card>
			<h4>Registered users: {{users.length}}</h4>
		</mat-card>
		<section>
			<table mat-table [dataSource]="users" class="mat-elevation-z8">
				<ng-container matColumnDef="firstName">
					<th mat-header-cell *matHeaderCellDef>First name</th>
					<td mat-cell *matCellDef="let user"> {{user.firstName}}</td>
				</ng-container>

				<ng-container matColumnDef="lastName">
					<th mat-header-cell *matHeaderCellDef>Last name</th>
					<td mat-cell *matCellDef="let user"> {{user.lastName}}</td>
				</ng-container>
				<ng-container matColumnDef="phone">
					<th mat-header-cell *matHeaderCellDef>Phone</th>
					<td mat-cell *matCellDef="let user"> {{user.phone}}</td>
				</ng-container>
				<ng-container matColumnDef="email">
					<th mat-header-cell *matHeaderCellDef>Email</th>
					<td mat-cell *matCellDef="let user"> {{user.email}}</td>
				</ng-container>
				<ng-container matColumnDef="role">
					<th mat-header-cell *matHeaderCellDef>Role</th>
					<td mat-cell *matCellDef="let user"> {{user.role}}</td>
				</ng-container>

				<ng-container matColumnDef="options">
					<th mat-header-cell *matHeaderCellDef> Options</th>
					<td mat-cell *matCellDef="let user">
						<button class="btn btn-sm btn-danger" (click)="deleteUser(user)">
							Delete
						</button>
					</td>
				</ng-container>

				<tr mat-header-row *matHeaderRowDef="displayedUserColumns"></tr>
				<tr mat-row *matRowDef="let row; columns: displayedUserColumns;"></tr>
			</table>
		</section>
		<br>
		<br>
		<mat-card>
			<h4>Submitted proposals: {{proposals.length}}</h4>

		</mat-card>
		<section>
			<table mat-table [dataSource]="proposals" class="mat-elevation-z8">

				<ng-container matColumnDef="proposalId">
					<th mat-header-cell *matHeaderCellDef> Proposal ID</th>
					<td mat-cell *matCellDef="let proposal"> {{proposal.proposalId}}</td>
				</ng-container>

				<ng-container matColumnDef="experimentTitle">
					<th mat-header-cell *matHeaderCellDef> Experiment title</th>
					<td mat-cell *matCellDef="let proposal"> {{proposal.experimentTitle}}</td>
				</ng-container>

				<ng-container matColumnDef="options">
					<th mat-header-cell *matHeaderCellDef> Options</th>
					<td mat-cell *matCellDef="let proposal">
						<a href="/api/pdf/{{proposal.proposalId}}">
							<button class="btn btn-sm btn-success">
								Download
							</button>
						</a>
						<button class="btn btn-sm btn-danger" (click)="deleteProposal(proposal)">
							Delete
						</button>
					</td>
				</ng-container>

				<tr mat-header-row *matHeaderRowDef="displayedProposalColumns"></tr>
				<tr mat-row *matRowDef="let row; columns: displayedProposalColumns;"></tr>
			</table>
		</section>
	`
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
		this.getProposals();
	}

	getProposals() {
		this.proposalService.getProposals().subscribe(
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