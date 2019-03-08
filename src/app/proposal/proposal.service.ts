import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal';
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { AuthService } from "../user/auth.service";
import { User } from "../models/user";

@Injectable({
	providedIn: 'root'
})
export class ProposalService {

	constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpClient,
	            public auth: AuthService
	) {
	}

	adminGetProposals(): Observable<Proposal[]> {
		return this.http.get<Proposal[]>('/api/admin/proposals');
	}

	getProposals(user: User): Observable<Proposal[]> {
		return this.http.get<Proposal[]>(`/api/proposals/${this.auth.currentUser.email}`);
	}

	addProposal(proposal: Proposal): Observable<Proposal> {
		return this.http.post<Proposal>('/api/proposals', proposal);
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