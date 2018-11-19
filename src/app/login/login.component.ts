import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	public email: string;
	public password: string;
	public error: string;

	constructor(private auth: AuthService, private router: Router) { }

	public submit() {
		this.auth.login(this.email, this.password)
		.pipe(first())
		.subscribe(
			result => this.router.navigate(['/home']),
			err => this.error = 'Could not authenticate'
		);
	}
}
