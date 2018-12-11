import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from "../models/user";
import { FormBuilder } from "@angular/forms";
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-user',
	template:
			`
		<style>

			mat-form-field {
				width: 80%;
			}
		</style>
		<h3>Account settings</h3>
		<form #accountForm="ngForm" (ngSubmit)="save(user)">
			<mat-form-field>
				<input matInput name="user.firstName" [(ngModel)]="user.firstName">
			</mat-form-field>
			<mat-form-field>
				<input matInput name="user.lastName" [(ngModel)]="user.lastName">
			</mat-form-field>
			<mat-form-field>
				<input matInput name="user.phone" [(ngModel)]="user.phone">
			</mat-form-field>
			<mat-form-field>
				<input matInput name="user.email" [(ngModel)]="user.email">
			</mat-form-field>
			<mat-divider></mat-divider>

			<mat-form-field>
				<input matInput name="user.employerSector" [(ngModel)]="user.employerSector">
			</mat-form-field>
			<mat-form-field>
				<input matInput name="user.employerName" [(ngModel)]="user.employerName">
			</mat-form-field>
			<mat-form-field>
				<input matInput name="user.employerStreet" [(ngModel)]="user.employerStreet">
			</mat-form-field>
			<mat-form-field>
				<input matInput name="user.employerZipcode" [(ngModel)]="user.employerZipcode">
			</mat-form-field>
			<mat-form-field>
				<input matInput name="user.employerCity" [(ngModel)]="user.employerCity">
			</mat-form-field>
			<mat-form-field>
				<input matInput name="user.employerCountry" [(ngModel)]="user.employerCountry">
			</mat-form-field>
			<fieldset>
				<button class="btn btn-primary" type="submit">Save</button>
			</fieldset>
		</form>
	`
})
export class UserComponent implements OnInit {

	isLoading = true;
	user: User;

	constructor(
		private auth: AuthService,
		private userService: UserService,
		private fb: FormBuilder
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
			error => console.log(error)
		);
	}

}