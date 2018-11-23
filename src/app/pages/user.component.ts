import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../components/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
	selector: 'app-user',
	template: `
		<style>

		</style>
		<app-toast [message]="toast.message"></app-toast>

		<div class="card">
			<h4 class="card-header">Account settings</h4>
			<div class="card-body">
				<form #accountForm="ngForm" (ngSubmit)="save(user)">
					<div class="input-group">
						<input class="form-control" type="text" name="firstName" [(ngModel)]="user.firstName" placeholder="First name">
					</div>
					<div class="input-group">
						<input class="form-control" type="text" name="firstName" [(ngModel)]="user.lastName" placeholder="Last name">
					</div>
					<div class="input-group">
						<input class="form-control" type="text" name="firstName" [(ngModel)]="user.employerName" placeholder="Affiliation name">
					</div>
					<div class="input-group">
						<input class="form-control" type="text" name="firstName" [(ngModel)]="user.phone" placeholder="Phone">
					</div>
					<div class="input-group">
						<input class="form-control" type="email" name="email" [(ngModel)]="user.email" placeholder="Email" required>
					</div>
					<div class="input-group">
						<select class="custom-select" name="role" [(ngModel)]="user.role">
							<option value="" disabled>Role</option>
							<option value="user">User</option>
							<option value="admin">Admin</option>
						</select>
					</div>
					<button class="btn btn-primary" type="submit" [disabled]="!accountForm.form.valid">
						<i class="fa fa-save"></i> Save
					</button>
				</form>
			</div>
		</div>
	`
})
export class UserComponent implements OnInit {

	user: User;

	constructor(
		private auth: AuthService,
		public toast: ToastComponent,
		private userService: UserService
	) {
	}

	ngOnInit() {
		this.getUser();
	}

	getUser() {
		this.userService.getUser(this.auth.currentUser).subscribe(
			data => this.user = data,
			error => console.log(error)
		);
	}

	save(user: User) {
		this.userService.editUser(user).subscribe(
			res => this.toast.setMessage('account settings saved!', 'success'),
			error => console.log(error)
		);
	}

}
