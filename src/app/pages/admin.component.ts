import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User} from "../models/user";

@Component({
	selector: 'app-admin',
	template:`
	<style>
		
	</style>

	<div class="card">
		<h4 class="card-header">Registered users ({{users.length}})</h4>
		<div class="card-body">
			<table class="table table-bordered">
				<thead class="thead-light">
				<tr>
					<th scope="col">First name</th>
										<th scope="col">Last name</th>
					<th scope="col">Email</th>
					<th scope="col">Role</th>
					<th scope="col">Actions</th>
				</tr>
				</thead>
				<tbody *ngIf="users.length === 0">
				<tr>
					<td colspan="4">There are no registered users.</td>
				</tr>
				</tbody>
				<tbody>
				<tr *ngFor="let user of users">
					<td>{{user.firstName}}</td>
					<td>{{user.lastName}}</td>
					<td>{{user.email}}</td>
					<td>{{user.role}}</td>
					<td>
						<button class="btn btn-sm btn-danger" (click)="deleteUser(user)"
						        [disabled]="auth.currentUser._id === user._id">
							<i class="fa fa-trash"></i> Delete
						</button>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>`
})
export class AdminComponent implements OnInit {

	users: User[] = [];
	isLoading = true;

	constructor(public auth: AuthService,
	            private userService: UserService) { }

	ngOnInit() {
		this.getUsers();
	}

	getUsers() {
		this.userService.getUsers().subscribe(
			data => this.users = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	deleteUser(user: User) {
		if (window.confirm('Are you sure you want to delete ' + user.email + '?')) {
			this.userService.deleteUser(user).subscribe(
				() => this.getUsers()
			);
		}
	}

}