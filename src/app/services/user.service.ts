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
		return this.http.post<User>('https://demax.esss.app/api/register', user);
	}

	login(credentials): Observable<any> {
		return this.http.post('https://demax.esss.app/api/login', credentials);
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>('https://demax.esss.app/api/users/all');
	}

	countUsers(): Observable<number> {
		return this.http.get<number>('https://demax.esss.app/api/users/count');
	}

	addUser(user: User): Observable<User> {
		return this.http.post<User>('https://demax.esss.app/api/users', user);
	}

	getUser(user: User): Observable<User> {
		return this.http.get<User>(`https://demax.esss.app/api/users/${user._id}`);
	}

	editUser(user: User): Observable<any> {
		return this.http.put(`https://demax.esss.app/api/users/${user._id}`, user, { responseType: 'text' });
	}

	deleteUser(user: User): Observable<any> {
		return this.http.delete(`https://demax.esss.app/api/users/${user._id}`, { responseType: 'text' });
	}

}