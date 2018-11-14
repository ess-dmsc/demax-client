import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	email = new FormControl('', [
		Validators.required,
		Validators.minLength(3),
		Validators.maxLength(100)
	]);
	password = new FormControl('', [
		Validators.required,
		Validators.minLength(6)
	]);

	constructor(private formBuilder: FormBuilder,
	            private router: Router) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: this.email,
			password: this.password
		});
	}

	setClassEmail() {
		return { 'has-danger': !this.email.pristine && !this.email.valid };
	}

	setClassPassword() {
		return { 'has-danger': !this.password.pristine && !this.password.valid };
	}

}
