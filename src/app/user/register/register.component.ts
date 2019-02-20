import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MessageComponent } from "../../shared/message/message.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";

export interface PrivacyDialogData {
	hasConsentedToGdpr: string;
}
export interface CookieDialogData {
	hasConsentedToCookies: string;
}

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
	phone = new FormControl('', [ Validators.required ]);
	password = new FormControl('', [ Validators.required, Validators.minLength(8) ]);
	employer = new FormControl('', [ Validators.required ]);
	jobTitle = new FormControl('', [ Validators.required ]);
	hasConsentedToGdpr = new FormControl('', [ Validators.required ]);
	hasConstentedToEmails = new FormControl('', [ Validators.required ]);
	hasConsentedToCookies = new FormControl('',[Validators.required]);

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		public message: MessageComponent,
		public dialog: MatDialog
	) {
	}

	openPrivacyDialog(): void {
		let dialogRef = this.dialog.open(PrivacyDialog, {
			width: '800px',
			data: {hasConsentedToGdpr: this.hasConsentedToGdpr}
		});
		window.scrollTo(0,0);

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.hasConsentedToGdpr = result;
		});
	}

	openCookieDialog(): void {
		let dialogRef = this.dialog.open(CookieDialog, {
			width: '800px',
			data: {hasConsentedToCookies: this.hasConsentedToCookies}
		});
		window.scrollTo(0,0);

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.hasConsentedToCookies = result;
		});
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
			hasConsentedToGdpr: this.hasConsentedToGdpr,
			hasConsentedToEmails: this.hasConstentedToEmails,
			hasConsentedToCookies: this.hasConsentedToCookies
		});
	}

	register() {
		this.userService.register(this.registerForm.value).subscribe(
			res => {
				this.message.setMessage('Email confirmation sent! Check your email.', 'success');
			},
			error => this.message.setMessage('email already exists', 'danger')
		)
		;
	}
}

@Component({
	selector: 'privacy-dialog',
	templateUrl: '../policys/privacy-dialog.html',
	styleUrls: [ '../policys/privacy-dialog.css']
})
export class PrivacyDialog {

	constructor(
		public dialogRef: MatDialogRef<PrivacyDialog>,
		@Inject(MAT_DIALOG_DATA) public data: PrivacyDialogData
	) {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}


@Component({
	selector: 'cookie-dialog',
	templateUrl: '../policys/cookie-dialog.html',
	styleUrls: ['../policys/cookie-dialog.css']
})
export class CookieDialog {

	constructor(
		public dialogRef: MatDialogRef<CookieDialog>,
		@Inject(MAT_DIALOG_DATA) public data: CookieDialogData
	) {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}

