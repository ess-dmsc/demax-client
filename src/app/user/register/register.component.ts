import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MessageComponent } from "../../shared/message/message.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";

export interface DialogData {
	hasConsentedToGdpr: string;
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
	hasConstentedToGdpr = new FormControl('', [ Validators.required ])
	hasConstentedToEmails = new FormControl('', [ Validators.required ])

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		public message: MessageComponent,
		public dialog: MatDialog
	) {
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(PrivacyDialog, {
			width: '800px',
			data: {name: this.hasConstentedToGdpr}
		});
		window.scrollTo(0,0);

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.hasConstentedToGdpr = result;
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
			hasConsentedToGdpr: this.hasConstentedToGdpr,
			hasConsentedToEmails: this.hasConstentedToEmails,
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
	templateUrl: 'privacy-dialog.html',
	styleUrls: ['privacy-dialog.css']
})
export class PrivacyDialog {

	constructor(
		public dialogRef: MatDialogRef<PrivacyDialog>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}
