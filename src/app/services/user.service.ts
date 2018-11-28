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
		return this.http.post<User>('/register', user);
	}

	login(credentials): Observable<any> {
		return this.http.post('/login', credentials);
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>('/users/all');
	}

	countUsers(): Observable<number> {
		return this.http.get<number>('/users/count');
	}

	addUser(user: User): Observable<User> {
		return this.http.post<User>('/users', user);
	}

	getUser(user: User): Observable<User> {
		return this.http.get<User>(`/users/${user._id}`);
	}

	editUser(user: User): Observable<any> {
		return this.http.put(`/users/${user._id}`, user, { responseType: 'text' });
	}

	deleteUser(user: User): Observable<any> {
		return this.http.delete(`/users/${user._id}`, { responseType: 'text' });
	}

}