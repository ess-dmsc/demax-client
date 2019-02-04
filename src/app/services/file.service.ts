import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from "../models/proposal";

@Injectable({
	providedIn: 'root'
})
export class FileService {

	constructor(private http: HttpClient) { }

	pushFileToStorage(file: File, proposal_id: string, input: string): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file, file.name);
		formdata.append('proposalId', proposal_id);
		formdata.append('name', input);

		const req = new HttpRequest('POST', `/api/file/upload/${input}`, formdata, {
			reportProgress: true,
			responseType: 'text'
		});

		return this.http.request(req);
	}


	getFiles(proposalId: string): Observable<any> {
		return this.http.get(`/api/file/${proposalId}`);
	}
}