import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: [ './account.component.css' ]
})
export class AccountComponent implements OnInit {

	user: User;
	isLoading = true;

	constructor(
		private auth: AuthService,
		private userService: UserService
	) {
	}

	ngOnInit() {
		this.getUser();
	}

	getUser() {
		this.userService.getUser(this.auth.currentUser).subscribe(
			data => this.user = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	save(user: User) {
		this.userService.editUser(user).subscribe(
			error => console.log(error)
		);
	}

}