import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../models/user";
import { UserService } from "../user.service";
import { AuthService } from "../auth.service";
import { MessageComponent } from "../../shared/message/message.component";
import { CustomValidators } from "../../shared/custom-validators";

@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: [ './password.component.css' ]
})
export class PasswordComponent implements OnInit {

	hide = true;
	user = new User();
	isLoading = true;

	editPasswordForm: FormGroup;
	password = new FormControl('', Validators.required);

	constructor(private message: MessageComponent,
	            private auth: AuthService,
	            private formBuilder: FormBuilder,
	            private userService: UserService) {
	}

	ngOnInit() {
		this.getUser();
		this.editPasswordForm = this.formBuilder.group({
				password: [
					null,
					Validators.compose([
						Validators.required,
						CustomValidators.patternValidator(/\d/, {
							hasNumber: true
						}),
						CustomValidators.patternValidator(/[A-Z]/, {
							hasCapitalCase: true
						}),
						Validators.minLength(8)
					])
				],
				confirmPassword: [null, Validators.compose([Validators.required])]
			},
			{
				validator: CustomValidators.passwordMatchValidator
			}
		);
	}

	getUser() {
		this.userService.getUser(this.auth.currentUser).subscribe(
			data => this.user = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	editPassword(user: User){
		this.userService.editPassword(user).subscribe(
			data =>{
				console.log(data)
				this.message.setMessage('Successfully changed password', 'success');
			},
			error =>{
				console.log(error)
			}
		)
	}

}
