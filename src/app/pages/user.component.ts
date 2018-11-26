import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from "../models/user";
import { ToastComponent } from "../components/toast/toast.component";

@Component({
	selector: 'app-user',
	template:
	`
		<app-loading [condition]="isLoading"></app-loading>

		<app-toast [message]="toast.message"></app-toast>

		<div class="card" *ngIf="!isLoading">
			<h4 class="card-header">Account settings</h4>
			<div class="card-body">
				<form #accountForm="ngForm" (ngSubmit)="save(user)">
					<div class="input-group">
						<div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-user"></i>
          </span>
						</div>
						<input class="form-control" type="text" name="email"
						       [(ngModel)]="user.email" placeholder="Email" required>
					</div>
					<div class="input-group">
						<div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-envelope"></i>
          </span>
						</div>
						<input class="form-control" type="email" name="phone"
						       [(ngModel)]="user.phone" placeholder="Phone" required>
					</div>
					<div class="input-group">
						<div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-black-tie"></i>
          </span>
						</div>
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
	isLoading = true;

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
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	save(user: User) {
		this.userService.editUser(user).subscribe(
			res => this.toast.setMessage('account settings saved!', 'success'),
			error => console.log(error)
		);
	}

}