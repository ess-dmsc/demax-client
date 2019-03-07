import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageComponent } from "../../shared/message/message.component";
import { UserService } from "../user.service";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

	hasForgottenPassword = false;

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
		return this.http.get('/api/users/forgot-pw/' + email).subscribe(
			response => {
				this.message.setMessage(response, 'success');
			},
			error => {
				this.message.setMessage(error.error, 'danger');
			}
		);
	}

	forgot() {
		this.hasForgottenPassword = true;
	}

	login() {
		this.auth.login(this.loginForm.value).subscribe(
			response => {
				this.router.navigate([ '/' ])
			},
			error => {
				console.log(error);
				this.message.setMessage(error.error, 'danger')
			}
		)
	}
}

