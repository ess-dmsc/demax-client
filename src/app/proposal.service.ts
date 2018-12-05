import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from './proposal';
import { APP_CONFIG, AppConfig } from "./app-config.module";

@Injectable({
	providedIn: 'root'
})
export class ProposalService {

	constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpClient) {
	}

	getProposals(): Observable<Proposal[]> {
		return this.http.get<Proposal[]>('/api/proposals');
	}

	countProposals(): Observable<number> {
		return this.http.get<number>('/api/proposals/count');
	}

	addProposal(proposal: Proposal): Observable<Proposal> {
		return this.http.post<Proposal>('/api/proposals', proposal);
	}

	getProposal(proposal: Proposal): Observable<Proposal> {
		return this.http.get<Proposal>(`/api/proposals/${proposal._id}`);
	}

	editProposal(proposal: Proposal): Observable<any> {
		return this.http.put(`/api/proposals/${proposal._id}`, proposal, {responseType: 'text'});
	}

	deleteProposal(proposal: Proposal): Observable<any> {
		return this.http.delete(`/api/proposals/${proposal._id}`, {responseType: 'text'});
	}

}