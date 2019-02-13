import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Attachment } from "../models/attachment";
import { Proposal } from "../models/proposal";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
	constructor(private http: HttpClient) {
	}

	pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();

		formdata.append('file', file);

		const req = new HttpRequest('POST', '/api/admin/file/upload', formdata, {
			reportProgress: true,
			responseType: 'text'
		});

		return this.http.request(req);
	}

	getFiles(): Observable<any> {
		return this.http.get('/api/admin/file/all');
	}

	getFilesAsObjects(): Observable<Attachment[]> {
		return this.http.get<Attachment[]>('/api/admin/file/all/object')
	}

	getFile(filename: string): Observable<any> {
		return this.http.get('/api/admin/file/download/' + filename)
	}

	deleteFile(filename: string): Observable<any> {
		return this.http.delete('/api/admin/file/delete/' + filename)
	}



	addProposal(proposal: Proposal): Observable<Proposal> {
		return this.http.post<Proposal>('/api/proposals', proposal);
	}

	getProposals(): Observable<Proposal[]> {
		return this.http.get<Proposal[]>('/api/admin/proposals');
	}

	getProposal(proposal: Proposal): Observable<Proposal> {
		return this.http.post<Proposal>('/api/proposals', proposal);
	}

	getProposalByProposalId(proposalId: string): Observable<Proposal> {
		return this.http.get<Proposal>('/api/proposals/getById/' + proposalId);
	}

	editProposal(proposal: Proposal): Observable<any> {
		return this.http.put(`/api/proposals/${proposal.proposalId}`, proposal, {responseType: 'text'});
	}

	deleteProposal(proposal: Proposal): Observable<any> {
		return this.http.delete(`/api/proposals/${proposal.proposalId}`, {responseType: 'text'});
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

	getUserByEmail(email: string): Observable<User>{
		return this.http.get<User>('/api/users/' + email);
	}

	editUser(user: User): Observable<any> {
		return this.http.put(`/api/users/${user._id}`, user, { responseType: 'text' });
	}

	deleteUser(user: User): Observable<any> {
		return this.http.delete(`/api/users/${user._id}`, { responseType: 'text' });
	}
}
