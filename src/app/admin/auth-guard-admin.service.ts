import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../user/auth.service";

@Injectable({
	providedIn: 'root',
})
export class AuthGuardAdmin implements CanActivate {

	constructor(public auth: AuthService, private router: Router) {}

	canActivate() {
		return this.auth.isAdmin;
	}
}