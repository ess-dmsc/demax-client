import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	username = new FormControl('', [
		Validators.required,
		Validators.minLength(2),
		Validators.maxLength(30),
		Validators.pattern('[a-zA-Z0-9_-\\s]*')
	]);
	email = new FormControl('', [
		Validators.required,
		Validators.minLength(3),
		Validators.maxLength(100)
	]);
	password = new FormControl('', [
		Validators.required,
		Validators.minLength(6)
	]);
	role = new FormControl('', [
		Validators.required
	]);

	constructor(private formBuilder: FormBuilder,
	            private router: Router,) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			email: this.email,
			password: this.password,
		});
	}

	setClassEmail() {
		return { 'has-danger': !this.email.pristine && !this.email.valid };
	}

	setClassPassword() {
		return { 'has-danger': !this.password.pristine && !this.password.valid };
	}

	/*register() {
		this.userService.register(this.registerForm.value).subscribe(
			res => {
				this.toast.setMessage('you successfully registered!', 'success');
				this.router.navigate(['/login']);
			},
			error => this.toast.setMessage('email already exists', 'danger')
		);
	}*/
}
