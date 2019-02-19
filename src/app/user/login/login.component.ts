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

	loginForm: FormGroup;
	email = new FormControl('', [
		Validators.required,
		Validators.minLength(3),
		Validators.maxLength(100)
	]);
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

	setClassEmail() {
		return { 'has-danger': !this.email.pristine && !this.email.valid };
	}

	setClassPassword() {
		return { 'has-danger': !this.password.pristine && !this.password.valid };
	}

	login() {
		this.auth.login(this.loginForm.value).subscribe(
			res =>
				this.router.navigate(['/']),
			error => this.message.setMessage('invalid email or password!', 'danger'),
		);
	}

}
