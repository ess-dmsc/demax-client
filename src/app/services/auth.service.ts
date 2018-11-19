import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
	constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) { }

	login(email: string, password: string): Observable<boolean> {
		return this.http.post<{token: string}>('/users/login', {email: email, password: password})
		.pipe(
			map(result => {
				this.localStorage.setItem('access_token', result.token);
				return true;
			})
		);
	}

	logout() {
		this.localStorage.removeItem('access_token');
	}

	public get loggedIn(): boolean {
		return (localStorage.getItem('access_token') !== null);
	}
}
