import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';
import { User } from '../models/user';
import 'rxjs/add/operator/map';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	loggedIn = false;
	isAdmin = false;

	currentUser: User = new User();

	constructor(
		private userService: UserService,
		private router: Router,
		private jwtHelper: JwtHelperService) {
		const token = localStorage.getItem('access_token');
		if(token) {
			const decodedUser = this.decodeUserFromToken(token);
			this.setCurrentUser(decodedUser);
		}
	}

	login(emailAndPassword) {
		return this.userService.login(emailAndPassword).map(
			res => {
				localStorage.setItem('access_token', res.token);
				const decodedUser = this.decodeUserFromToken(res.token);
				this.setCurrentUser(decodedUser);
				return this.loggedIn;
			}
		);
	}

	forgotPassword(email: string){
		return this.userService.forgotPassword(email);
	}

	logout() {
		localStorage.removeItem('access_token');
		this.loggedIn = false;
		this.isAdmin = false;
		this.currentUser = new User();
		this.router.navigate([ '/' ]);
	}

	decodeUserFromToken(token) {
		return this.jwtHelper.decodeToken(token).user;
	}

	setCurrentUser(decodedUser) {
		this.loggedIn = true;
		this.currentUser._id = decodedUser._id;
		this.currentUser.email = decodedUser.email;
		this.currentUser.firstName = decodedUser.firstName;
		this.currentUser.lastName = decodedUser.lastName;
		this.currentUser.phone = decodedUser.phone;
		this.currentUser.employer = decodedUser.employer;
		this.currentUser.jobTitle = decodedUser.jobTitle;
		this.currentUser.hasConsentedToGdpr = decodedUser.hasConsentedToGdpr;
		this.currentUser.hasConsentedToEmails = decodedUser.hasConsentedToEmails;
		this.currentUser.role = decodedUser.role;
		decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
		delete decodedUser.role;
	}

}
