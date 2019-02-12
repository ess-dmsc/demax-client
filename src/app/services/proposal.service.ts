import {Inject, Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpEventType,
    HttpHeaders,
    HttpRequest
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Proposal} from '../models/proposal';
import {APP_CONFIG, AppConfig} from "../app-config.module";
import {catchError, last, map, tap} from "rxjs/operators";
import {AuthService} from "./auth.service";
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

    deleteProposal(proposal: Proposal): Observable<any> {
        return this.http.delete(`/api/proposals/${proposal.proposalId}`, {responseType: 'text'});
    }

}