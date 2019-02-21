import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageComponent } from "../../shared/message/message.component";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {
	hide = true;
	loginForm: FormGroup;
	email = new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.email ]);
	password = new FormControl('', [
		Validators.required
	]);

	constructor(private auth: AuthService,
	            private formBuilder: FormBuilder,
	            private router: Router,
	            public message: MessageComponent) { }

	ngOnInit() {
		if (this.auth.loggedIn) {
			this.router.navigate(['/']);
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

	login() {
		this.auth.login(this.loginForm.value).subscribe(
			res =>
				this.router.navigate(['/']),
			error => this.message.setMessage('invalid email or password!', 'danger'),
		);
	}

}
