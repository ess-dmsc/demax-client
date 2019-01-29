import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../external/material.module';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	message = 'Register';

	registerForm: FormGroup;
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
	employer = new FormControl('');
	industry = new FormControl('');
	jobTitle = new FormControl('');
	hasConsentedToGdpr = new FormControl('');
	hasConsentedToEmails = new FormControl('');

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService
	) {
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			firstName: this.firstName,
			lastName: this.lastName,
			phone: this.phone,
			email: this.email,
			password: this.password,
			employer: this.employer,
			industry: this.industry,
			jobTitle: this.jobTitle,
			hasConsentedToGdpr: this.hasConsentedToGdpr,
			hasConsentedToEmails: this.hasConsentedToEmails
		});
	}

	setClassEmail() {
		return {'has-danger': !this.email.pristine && !this.email.valid};
	}

	setClassPassword() {
		return {'has-danger': !this.password.pristine && !this.password.valid};
	}

	register() {
		this.userService.register(this.registerForm.value);
		this.message = 'Registered!';
	}
}
