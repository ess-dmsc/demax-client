import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MessageComponent } from "../../shared/message/message.component";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	firstName = new FormControl('', [ Validators.required ]);
	lastName = new FormControl('', [ Validators.required ]);
	email = new FormControl('', [ Validators.required, Validators.minLength(3), ]);
	phone = new FormControl('', [ Validators.required ])
	password = new FormControl('', [ Validators.required ]);
	employer = new FormControl('', [ Validators.required ]);
	jobTitle = new FormControl('', [ Validators.required ]);
	hasConstentedToGdpr = new FormControl('', [ Validators.required ])
	hasConstentedToEmails = new FormControl('', [ Validators.required ])

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		public message: MessageComponent
	) {
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			phone: this.phone,
			password: this.password,
			employer: this.employer,
			jobTitle: this.jobTitle,
			hasConsentedToGdpr: this.hasConstentedToGdpr,
			hasConsentedToEmails: this.hasConstentedToEmails,
		});
	}

	register() {
		this.userService.register(this.registerForm.value).subscribe(
			res => {
				this.message.setMessage('you successfully registered!', 'success');
			},
			error => this.message.setMessage('email already exists', 'danger')
		)
		;
	}
}
