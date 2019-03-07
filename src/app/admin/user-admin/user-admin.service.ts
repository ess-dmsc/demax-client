import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class UserAdminService {

	constructor(private http: HttpClient) {
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>('/api/admin/users');
	}

	countUsers(): Observable<number> {
		return this.http.get<number>('/api/admin/users/count');
	}

	addUser(user: User): Observable<User> {
		return this.http.post<User>('/api/admin/users', user);
	}

	getUser(user: User): Observable<User> {
		return this.http.get<User>(`/api/admin/users/${user.email}`);
	}

	editPassword(user: User): Observable<any> {
		console.log(user.password)
		return this.http.put(`/api/admin/users/changepassword/${user.email}/${user.password}`,{responseType: 'text'});
	}

	getUserByEmail(email: string): Observable<User> {
		return this.http.get<User>('/api/admin/users/' + email);
	}

	editUser(user: User): Observable<any> {
		return this.http.put(`/api/admin/users/${user.email}`, user, {responseType: 'text'});
	}

	deleteUser(email: string): Observable<any> {
		return this.http.delete(`/api/admin/users/${email}`, {responseType: 'text'});
	}
}
