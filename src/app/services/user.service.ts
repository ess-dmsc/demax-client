import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable({providedIn: 'root'})
export class UserService {
	constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpClient) {
	}

	register(user: User): Observable<User> {
		return this.http.post<User>(APP_CONFIG + '/users/register', user);
	}

	login(credentials): Observable<any> {
		return this.http.post('/users/login', credentials);
	}

	getUsers(): Observable<User[ ]> {
		return this.http.get<User[]>('/users');
	}

	countUsers(): Observable<number> {
		return this.http.get<number>('/users/count');
	}

	getUser(user: User): Observable<User> {
		return this.http.get<User>(`/users/${user._id}`);
	}

	editUser(user: User): Observable<any> {
		return this.http.put(`/users/${user._id}`, user, {responseType: 'text'});
	}

	deleteUser(user: User): Observable<any> {
		return this.http.delete(`/users/${user._id}`, {responseType: 'text'});
	}
}