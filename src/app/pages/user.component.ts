import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from "../models/user";
import { ToastComponent } from "../components/toast/toast.component";

@Component({
	selector: 'app-user',
	template:
		`
		<style>
		
		mat-form-field {
			width: 80%;
		}
		</style>
		<app-toast [message]="toast.message"></app-toast>
		<mat-card style="width: 500px; margin: 2rem auto;">
			<mat-card-header>
				<mat-card-title>Account settings</mat-card-title>
			</mat-card-header>
			<mat-card-content>
				<form #accountForm="ngForm" (ngSubmit)="save(user)">
					<mat-form-field>
						<input matInput name="firstName" [(ngModel)]="user.firstName">
					</mat-form-field>
					<mat-form-field>
						<input matInput name="lastName" [(ngModel)]="user.lastName">
					</mat-form-field>
					<mat-form-field>
						<input matInput name="phone" [(ngModel)]="user.phone">
					</mat-form-field>
					<mat-form-field>
						<input matInput name="email" [(ngModel)]="user.email">
					</mat-form-field>
					<mat-divider></mat-divider>

					<mat-form-field>
						<input matInput name="employerSector" [(ngModel)]="user.employerSector">
					</mat-form-field>
					<mat-form-field>
						<input matInput name="employerName" [(ngModel)]="user.employerName">
					</mat-form-field>
					<mat-form-field>
						<input matInput name="employerStreet" [(ngModel)]="user.employerStreet">
					</mat-form-field>
					<mat-form-field>
						<input matInput name="employerZipcode" [(ngModel)]="user.employerZipcode">
					</mat-form-field>
					<mat-form-field>
						<input matInput name="employerCity" [(ngModel)]="user.employerCity">
					</mat-form-field>
					<mat-form-field>
						<input matInput name="employerCountry" [(ngModel)]="user.employerCountry">
					</mat-form-field>
					<mat-form-field>
						<mat-select name="role" [(ngModel)]="user.role">
							<mat-option value="" disabled>Role</mat-option>
							<mat-option value="admin">Admin</mat-option>
							<mat-option value="user">User</mat-option>
						</mat-select>
					</mat-form-field>
					<fieldset>
					<button mat-raised-button type="submit">Save</button>
					</fieldset>
				</form>
			</mat-card-content>
		</mat-card>
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