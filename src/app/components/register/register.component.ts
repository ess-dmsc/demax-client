import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule} from "../../external/material.module";
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls:[ './register.component.css']
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
	employerSector = new FormControl('');
	employerName = new FormControl('');
	employerStreet = new FormControl('');
	employerZipcode = new FormControl('');
	employerCity = new FormControl('');
	employerCountry = new FormControl('');

	constructor(private formBuilder: FormBuilder,
	            private router: Router,
	            private userService: UserService) { }

	ngOnInit() {
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

	setClassEmail() {
		return { 'has-danger': !this.email.pristine && !this.email.valid };
	}

	setClassPassword() {
		return { 'has-danger': !this.password.pristine && !this.password.valid };
	}

	register() {
		this.message = 'Registered!'
		this.userService.register(this.registerForm.value).subscribe(
			res => {
				this.router.navigate(['/login']);
			},
		);
	}
}
