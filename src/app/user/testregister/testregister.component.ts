import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "../../custom-validators";

@Component({
  selector: 'app-testregister',
  templateUrl: './testregister.component.html',
  styleUrls: [ './testregister.component.css']
})
export class TestregisterComponent {

	public frmSignup: FormGroup;

	constructor(private fb: FormBuilder) {
		this.frmSignup = this.createSignupForm();
	}

	createSignupForm(): FormGroup {
		return this.fb.group(
			{
				email: [
					null,
					Validators.compose([Validators.email, Validators.required])
				],
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
						CustomValidators.patternValidator(/[a-z]/, {
							hasSmallCase: true
						}),
						CustomValidators.patternValidator(
							/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
							{
								hasSpecialCharacters: true
							}
						),
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

	submit() {
		console.log(this.frmSignup.value);
	}
}