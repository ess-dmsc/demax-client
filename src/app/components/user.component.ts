import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

			div {
				margin: 2rem;
				width: 80%;
			}
		</style>
		<form (ngSubmit)="save(user)">

		<mat-form-field>
			<input matInput
			       name="user.firstName"
			       [(ngModel)]="user.firstName"
			       placeholder="First name">
		</mat-form-field>
		<mat-form-field>
			<input matInput
			       name="user.lastName"
			       [(ngModel)]="user.lastName"
			       placeholder="Last name">
		</mat-form-field>
		<mat-form-field>
			<input matInput
			       name="user.phone"
			       [(ngModel)]="user.phone"
			       placeholder="Phone">
		</mat-form-field>
		<mat-form-field>
			<input matInput
			       name="user.email"
			       [(ngModel)]="user.email"
			       placeholder="Email">
		</mat-form-field>
		<mat-form-field>
			<input matInput
			       type="password"
			       name="user.password"
			       [(ngModel)]="user.password"
			       placeholder="Password">
		</mat-form-field>
		<mat-form-field>
			<input matInput
			       name="user.industry"
			       [(ngModel)]="user.industry"
			       placeholder="Industry">
		</mat-form-field>
		<mat-form-field>
			<input matInput
			       name="user.employer"
			       [(ngModel)]="user.employer"
			       placeholder="Employer">
		</mat-form-field>
		<mat-form-field>
			<input matInput
			       name="user.jobTitle"
			       [(ngModel)]="user.jobTitle"
			       placeholder="Job title">
		</mat-form-field>
			<mat-action-row>
				<button mat-raised-button color="primary" type="submit">Save</button>
			</mat-action-row>
		</form>
	`
})
export class UserComponent implements OnInit {
	message = 'Save';
	user: User;

	userForm = this.formBuilder.group({
		firstName: [ '' ],
		lastName: [ '' ],
		email: [ '' ],
		phone: [ '' ],
		password: [ '' ],
		employer: [ '' ],
		industry: [ '' ],
		jobTitle: [ '' ]
	});

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private auth: AuthService
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
		this.message = 'Saved!';
		this.userService.editUser(user).subscribe(
			error => console.log(error)
		)
	}
}