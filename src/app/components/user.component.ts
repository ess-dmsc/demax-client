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

	`
})
export class UserComponent implements OnInit {
	message = 'Save';
	user: User;

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