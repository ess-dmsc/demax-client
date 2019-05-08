import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal';
import { AuthService } from "../user/auth.service";
import { User } from "../models/user";

@Injectable({
	providedIn: 'root'
})
export class ProposalService {

	constructor(
		private http: HttpClient,
		public auth: AuthService
	) {
	}

	getComments(proposalId: string): Observable<any> {
		return this.http.get('/api/admin/proposals/comments/' + proposalId);
	}

	addComment(comment: any): Observable<any> {
		return this.http.post('/api/admin/proposals/comment/' + comment.proposal, comment);
	}

	deleteComment(proposalId: string, commentId: string): Observable<any> {
		return this.http.delete('/api/admin/proposals/comments/' + proposalId + '/' + commentId);
	}

	getTsf(proposalId: string): Observable<any>{
		return this.http.get('/api/admin/proposals/tsf/' + proposalId);
	}
	addTsf(tsf: any): Observable<any>{
		return this.http.post('/api/admin/proposals/tsf/' + tsf.proposal, tsf);
	}
	deleteTsf(proposalId: string, tsfId: string): Observable<any> {
		return this.http.delete('/api/admin/proposals/tsf/' + proposalId + '/' + tsfId);
	}

	adminGetProposals(): Observable<Proposal[]> {
		return this.http.get<Proposal[]>('/api/admin/proposals');
	}
	adminGetProposalsByDate(startdate: string, enddate: string){
		return this.http.get<Proposal[]>('/api/admin/proposals/' + startdate + '/' + enddate)
	}

	getProposals(user: User): Observable<Proposal[]> {
		return this.http.get<Proposal[]>(`/api/proposals/${this.auth.currentUser.email}`);
	}

	addProposal(proposal: Proposal): Observable<Proposal> {
		return this.http.post<Proposal>('/api/proposals', proposal);
	}

	getProposalByProposalId(proposalId: string): Observable<Proposal> {
		return this.http.get<Proposal>('/api/proposals/getById/' + proposalId);
	}

	syncProposal(proposal: Proposal): Observable<Proposal> {
		return this.http.put<Proposal>('/api/proposals/sync/' + proposal.proposalId, proposal);
	}

	editProposal(proposal: Proposal): Observable<any> {
		return this.http.put(`/api/proposals/${proposal.proposalId}`, proposal, {responseType: 'text'});
	}

	submitProposal(proposalId: string): Observable<any> {
		return this.http.put(`/api/proposals/submit/${proposalId}`, {responseType: 'text'})
	}

	deleteProposal(proposal: Proposal): Observable<any> {
		return this.http.delete(`/api/proposals/${proposal.proposalId}`, {responseType: 'text'});
	}

	pushFileToStorage(file: File, proposalId: string, input: string): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();

		formdata.append('file', file, file.name);
		formdata.append('proposalId', proposalId);
		formdata.append('name', input);

		const req = new HttpRequest('POST', `/api/file/upload/${input}`, formdata, {
			reportProgress: true,
			responseType: 'text'
		});
		return this.http.request(req);
	}

	deleteFile(filename: string, proposal: Proposal, input: string): Observable<any> {


		const req = new HttpRequest('DELETE', `/api/file/delete/${proposal.proposalId}/${input}/${filename}`, {
			reportProgress: true,
			responseType: 'text'
		});

		return this.http.request(req);
	}
}