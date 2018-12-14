import { Component, OnInit, Inject, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AppConfig } from "./app-config.module";
import { APP_CONFIG } from "./app-config.module";
import { AuthService } from "./services/auth.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewChecked {
	title = 'demax-client';
	opened: boolean;
	message = 'Register';

	registerForm: FormGroup;
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
	firstName = new FormControl('');
	lastName = new FormControl('');
	phone = new FormControl('');
	employerSector = new FormControl('');
	employerName = new FormControl('');
	employerStreet = new FormControl('');
	employerZipcode = new FormControl('');
	employerCity = new FormControl('');
	employerCountry = new FormControl('');


	setClassEmail() {
		return {'has-danger': !this.email.pristine && !this.email.valid};
	}

	setClassPassword() {
		return {'has-danger': !this.password.pristine && !this.password.valid};
	}

	login() {
		this.auth.login(this.loginForm.value).subscribe(
			res => this.router.navigate([ '/' ]),
		);
	}

	register() {
		this.message = 'Registered!'
		this.userService.register(this.registerForm.value).subscribe(
			res => {
				this.router.navigate(['/login']);
			},
		);
	}

	constructor(
		public auth: AuthService,
		private changeDetector: ChangeDetectorRef,
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		@Inject(APP_CONFIG) private appConfig: AppConfig
	) {
	}

	ngAfterViewChecked() {
		this.changeDetector.detectChanges();
	}

	ngOnInit() {
		if(this.auth.loggedIn) {
			this.router.navigate([ '/' ]);
		}
		this.loginForm = this.formBuilder.group({
			email: this.email,
			password: this.password
		});
		this.registerForm = this.formBuilder.group({
			firstName: this.firstName,
			lastName: this.lastName,
			phone: this.phone,
			email: this.email,
			password: this.password,
			employerSector: this.employerSector,
			employerName: this.employerName,
			employerStreet: this.employerStreet,
			employerZipcode: this.employerZipcode,
			employerCity: this.employerCity,
			employerCountry: this.employerCountry
		});
	}

}
