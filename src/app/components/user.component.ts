import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from "../models/user";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
	selector: 'app-user',
	template:
			`
		<style>
			.smallFormField {
				width: 300px;
			}

			mat-form-field {
				width: 80%;
				margin: 1rem;
			}
			div{
				margin: 2rem;
				width: 80%;
			}
		</style>
		<div>
			<h3>Account settings</h3>
			<form #accountForm="ngForm" (ngSubmit)="save(user)">
				<br>
				<h4>Personal information</h4>
				<br>
				<mat-form-field class="smallFormField">
					<input placeholder="First name" matInput name="user.firstName" [(ngModel)]="user.firstName">
				</mat-form-field>
				<mat-form-field class="smallFormField">
					<input placeholder="Last name" matInput name="user.lastName" [(ngModel)]="user.lastName">
				</mat-form-field>
				<br>
				<mat-form-field class="smallFormField">
					<input placeholder="Phone" matInput name="user.phone" [(ngModel)]="user.phone">
				</mat-form-field>
				<mat-form-field class="smallFormField">
					<input placeholder="Email" matInput name="user.email" [(ngModel)]="user.email">
				</mat-form-field>
				<br>
				<h4>Affiliation</h4>
				<br>
				<mat-form-field>
					<mat-select matInput [(ngModel)]="user.employerSector" name="user.employerSector" placeholder="Sector/industry">
						<mat-option value="Select">Select</mat-option>
						<mat-option value="Something">Something</mat-option>
						<mat-option value="Something else">Something else</mat-option>
					</mat-select>
				</mat-form-field>
				<mat-form-field>
					<input placeholder="Employer" matInput name="user.employerName" [(ngModel)]="user.employerName">
				</mat-form-field>
				<mat-form-field>
					<input placeholder="Street" matInput name="user.employerStreet" [(ngModel)]="user.employerStreet">
				</mat-form-field>
				<mat-form-field class="smallFormField">
					<input placeholder="Zipcode" matInput name="user.employerZipcode"
					       [(ngModel)]="user.employerZipcode">
				</mat-form-field>
				<mat-form-field class="smallFormField">
					<input placeholder="City" matInput name="user.employerCity" [(ngModel)]="user.employerCity">
				</mat-form-field>
				<mat-form-field>
					<input placeholder="Country" matInput name="user.employerCountry"
					       [(ngModel)]="user.employerCountry">
				</mat-form-field>
				<fieldset>
					<button class="btn btn-primary" type="submit">{{this.message}}</button>
				</fieldset>
			</form>
		</div>

	`
})
export class UserComponent implements OnInit {
	message = 'Save';
	userform: FormGroup;
	email = new FormControl('', [
		Validators.required,
		Validators.minLength(3),
		Validators.maxLength(100)
	]);
	password = new FormControl('', [
		Validators.required,
		Validators.minLength(6)
	]);
	firstName = new FormControl('');
	lastName = new FormControl('');
	phone = new FormControl('');
	employerSector = new FormControl('');
	employerName = new FormControl('');
	employerStreet = new FormControl('');
	employerZipcode = new FormControl('');
	employerCity = new FormControl('');
	employerCountry = new FormControl('');
	role = new FormControl('', [
		Validators.required
	]);

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private auth: AuthService
	) {
	}

	ngOnInit() {
		this.getUser();
		this.userform = this.formBuilder.group({
			firstName: this.firstName,
			lastName: this.lastName,
			phone: this.phone,
			email: this.email,
			password: this.password,
			role: this.role,
			employerSector: this.employerSector,
			employerName: this.employerName,
			employerStreet: this.employerStreet,
			employerZipcode: this.employerZipcode,
			employerCity: this.employerCity,
			employerCountry: this.employerCountry
		});
	}

	setClassEmail() {
		return {'has-danger': !this.email.pristine && !this.email.valid};
	}

	setClassPassword() {
		return {'has-danger': !this.password.pristine && !this.password.valid};
	}

	isLoading = true;
	user: User;

	getUser() {
		this.userService.getUser(this.auth.currentUser).subscribe(
			data => this.user = data,
			error => console.log(error)
		);
	}

	save(user: User) {
		this.message = 'Saved!';
		this.userService.editUser(user).subscribe(
			error => console.log(error)
		)}
}