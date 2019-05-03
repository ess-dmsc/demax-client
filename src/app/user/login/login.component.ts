import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageComponent } from "../../shared/message/message.component";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

	hasForgottenPassword = false;
	isLoggingIn = false;
	hide = true;
	loginForm: FormGroup;
	email = new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.email ]);
	password = new FormControl('', [ Validators.required, Validators.minLength(3) ]);

	constructor(
		private auth: AuthService,
		private formBuilder: FormBuilder,
		private router: Router,
		private http: HttpClient,
		public message: MessageComponent
	) {
	}

	ngOnInit() {
		if(this.auth.loggedIn) {
			this.router.navigate([ '/' ]);
		}
		this.loginForm = this.formBuilder.group({
			email: this.email,
			password: this.password
		});
	}

	getErrorMessage() {
		return this.email.hasError('required') ? 'You must enter a valid email' :
			this.email.hasError('email') ? 'Not a valid email' :
				'';
	}

	reset(email: string) {
		this.isLoggingIn = true;
		return this.http.get('/api/users/forgot-pw/' + email).subscribe(
			response => {
				this.isLoggingIn = false;
				this.message.setMessage(response, 'success');
			},
			error => {
				this.isLoggingIn = false;
				this.message.setMessage(error.error, 'danger');
			}
		);
	}

	forgot() {
		this.hasForgottenPassword = true;
	}

	login() {
		this.isLoggingIn = true;
		this.auth.login(this.loginForm.value).subscribe(
			response => {
				this.router.navigate([ '/' ])
				this.isLoggingIn = false;
			},
			error => {
				console.log(error);
				this.isLoggingIn = false;
				this.message.setMessage(error.error, 'danger')
			}
		)
	}
}

