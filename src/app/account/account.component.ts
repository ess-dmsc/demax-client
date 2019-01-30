import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import { FormBuilder } from "@angular/forms";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

	message = 'Save';
	user: User;

	userForm = this.formBuilder.group({
		firstName: [ '' ],
		lastName: [ '' ],
		email: [ '' ],
		phone: [ '' ],
		password: [ '' ],
		employer: [ '' ],
		industry: [ '' ],
		jobTitle: [ '' ]
	});

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private auth: AuthService
	) {
	}

	ngOnInit() {
		this.getUser();
	}


	getUser() {
		this.userService.getUser(this.auth.currentUser).subscribe(
			data => this.user = data,
			error => console.log(error)
		);
	}

	save(user: User) {
		this.message = 'Saved!';
		this.userService.editUser(user).subscribe(
			error => console.log(error)
		)
	}
}