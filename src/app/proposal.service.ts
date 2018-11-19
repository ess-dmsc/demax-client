import { Inject, Injectable } from '@angular/core';
import { Proposal } from './proposal';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from './app-config.module';

@Injectable({
	providedIn: 'root'
})
export class ProposalService {
	private proposalsUrl = '/proposals';

	constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: Http) {
	}

	getProposals(): Promise<Proposal[]> {
		return this.http.get(this.proposalsUrl)
		.toPromise()
		.then(response => response.json() as Proposal[])
		.catch(this.handleError);
	}

	createProposal(newProposal: Proposal): Promise<Proposal> {
		return this.http.post(this.proposalsUrl, newProposal)
		.toPromise()
		.then(response => response.json() as Proposal)
		.catch(this.handleError);
	}

	// get("/api/proposals/:id") endpoint not used by Angular app

	deleteProposal(delProposalId: String): Promise<String> {
		return this.http.delete(this.proposalsUrl + '/' + delProposalId)
		.toPromise()
		.then(response => response.json() as String)
		.catch(this.handleError);
	}

	updateProposal(putProposal: Proposal): Promise<Proposal> {
		const putUrl = this.proposalsUrl + '/' + putProposal._id;
		return this.http.put(putUrl, putProposal)
		.toPromise()
		.then(response => response.json() as Proposal)
		.catch(this.handleError);
	}

	handleError(error: any): Promise<any> {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console
		return Promise.reject(errMsg);
	}
}