import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: [ './user-admin.component.css']
})
export class UserAdminComponent implements OnInit {

	isLoading = true;

	users: User[] = [];
	displayedUserColumns: string[] = [ 'firstName', 'lastName', 'phone', 'email', 'role', 'options' ];

	constructor(private userService: UserService) { }

  ngOnInit() {
	  this.getUsers();
  }

	getUsers() {
		this.userService.getUsers().subscribe(
			data => this.users = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	editUser(user: User) {
		this.userService.editUser(user).subscribe(
			() => this.getUsers()
		)
	}

	deleteUser(user: User) {
		if(window.confirm('Are you sure you want to delete ' + user.email + '?')) {
			this.userService.deleteUser(user).subscribe(
				() => this.getUsers()
			);
		}
	}
}
