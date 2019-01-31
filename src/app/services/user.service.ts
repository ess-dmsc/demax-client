import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class UserService {

	constructor(private http: HttpClient) { }

	register(user: User): Observable<User> {
		return this.http.post<User>('/api/users/register', user);
	}

	login(credentials): Observable<any> {
		return this.http.post('/api/users/login', credentials);
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>('/api/admin/users');
	}

	countUsers(): Observable<number> {
		return this.http.get<number>('/api/users/count');
	}

	addUser(user: User): Observable<User> {
		return this.http.post<User>('/api/users', user);
	}

	getUser(user: User): Observable<User> {
		return this.http.get<User>(`/api/users/${user.email}`);
	}

	editUser(user: User): Observable<any> {
		return this.http.put(`/api/users/${user._id}`, user, { responseType: 'text' });
	}

	deleteUser(user: User): Observable<any> {
		return this.http.delete(`/api/users/${user._id}`, { responseType: 'text' });
	}

}