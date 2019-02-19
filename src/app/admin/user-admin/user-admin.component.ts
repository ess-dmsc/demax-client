import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";
import { UserAdminService } from "./user-admin.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: [ './user-admin.component.css']
})
export class UserAdminComponent implements OnInit {

	isLoading = true;
	isEditing = false;
	isEditingPassword = false;

	user = new User();
	users: User[] = [];
	displayedUserColumns: string[] = [ 'firstName', 'lastName', 'phone', 'email', 'role', 'options' ];

	editUserForm: FormGroup;
	email = new FormControl('', Validators.required);
	role = new FormControl('', Validators.required);

	editPasswordForm: FormGroup;
	password = new FormControl('', Validators.required);

	constructor(private userAdminService: UserAdminService, private formBuilder: FormBuilder) { }

  ngOnInit() {
	  this.getUsers();
	  this.editUserForm = this.formBuilder.group({
		  email: this.email,
		  role: this.role
	  });
	  this.editPasswordForm = this.formBuilder.group({
		  password: this.password
	  });
  }

	getUsers() {
		this.userAdminService.getUsers().subscribe(
			data => this.users = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	editUser(user: User) {
		this.userAdminService.editUser(user).subscribe(
			() => {
				this.isEditing = false;
				this.user = user;
				this.getUsers()
			},
			error =>{
				console.log(error)
			}
		)
	}
	editPassword(user: User){
		this.userAdminService.editPassword(user).subscribe(
			()=>{
				this.isEditingPassword = false;
				this.user = user;
				this.getUsers();
			},
			error =>{
				console.log(error)
			}
		)
	}
	enablePasswordEditing(user: User){
		this.isEditingPassword = true;
		this.user = user;
	}
	cancelPasswordEditing(){
		this.isEditingPassword = false;
		this.user = new User();
		this.getUsers();
	}
	enableEditing(user: User) {
		this.isEditing = true;
		this.user = user;
	}
	cancelEditing(){
		this.isEditing = false;
		this.user = new User();
		this.getUsers();
	}

	deleteUser(email: string) {
		if(window.confirm('Are you sure you want to delete ' + email + '?')) {
			this.userAdminService.deleteUser(email).subscribe(
				() => this.getUsers()
			);
		}
	}
}
