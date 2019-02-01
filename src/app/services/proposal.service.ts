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
import {MessageService} from "./message.service";
import {AuthService} from "./auth.service";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class ProposalService {

    constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpClient,
                private messenger: MessageService,
                public auth: AuthService
    ) {
    }

    adminGetProposals(): Observable<Proposal[]> {
        return this.http.get<Proposal[]>('/api/admin/proposals');
    }

	getProposals(user: User): Observable<Proposal[]> {
		return this.http.get<Proposal[]>(`/api/proposals/${this.auth.currentUser.email}`);
	}

	getProposal(proposal: Proposal): Observable<Proposal> {
		return this.http.get<Proposal>(`/api/proposals/${proposal.proposalId}`);
	}

	addProposal(proposal: Proposal): Observable<Proposal> {
		return this.http.post<Proposal>('/api/proposals', proposal);
	}

	editProposal(proposal: Proposal): Observable<any> {
        return this.http.put(`/api/proposals/${proposal.proposalId}`, proposal, {responseType: 'text'});
    }

    deleteProposal(proposal: Proposal): Observable<any> {
        return this.http.delete(`/api/proposals/${proposal.proposalId}`, {responseType: 'text'});
    }

    private getEventMessage(event: HttpEvent<any>, file: File) {
        switch (event.type) {
            case HttpEventType.Sent:
                return `Uploading file "${file.name}" of size ${file.size}.`;

            case HttpEventType.UploadProgress:
                const percentDone = Math.round(100 * event.loaded / event.total);
                return `File "${file.name}" is ${percentDone}% uploaded.`;

            case HttpEventType.Response:
                return `File "${file.name}" was completely uploaded!`;

            default:
                return `File "${file.name}" surprising upload event: ${event.type}.`;
        }
    }

    private handleError(file: File) {
        const userMessage = `${file.name} upload failed.`;

        return (error: HttpErrorResponse) => {
            console.error(error);

            const message = (error.error instanceof Error) ?
                error.error.message :
                `server returned code ${error.status} with body "${error.error}"`;

            this.messenger.add(`${userMessage} ${message}`);

            return of(userMessage);
        };
    }

    private showProgress(message: string) {
        this.messenger.add(message);
    }

    pushFileToStorage(file: File, proposal: Proposal, input: string) {
        const formdata: FormData = new FormData();
        formdata.append('file', file, file.name);
        formdata.append('proposalId', proposal.proposalId);
        formdata.append('name', input);
        if (!file) {
            return;
        }

        const req = new HttpRequest('POST', `/api/file/upload/${input}`, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req).pipe(
            map(event => this.getEventMessage(event, file)),
            tap(message => this.showProgress(message)),
            last(),
            catchError(this.handleError(file))
        );
    }

    getFiles(proposal: Proposal): Observable<any> {
        return this.http.get(`/api/file/proposals/${proposal.proposalId}`);
    }

	removeFile(filename: String): Observable<any>{
    	return this.http.get(`/api/file/${filename}`, {responseType: 'text'})
	}
}