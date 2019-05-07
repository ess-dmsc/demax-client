import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from "../models/proposal";

@Injectable({
	providedIn: 'root'
})
export class FileService {

	constructor(private http: HttpClient) {
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
		const deleteData: FormData = new FormData();

		deleteData.append('filename', filename);
		deleteData.append('proposalId', proposal.proposalId);
		deleteData.append('attachmentType', input);
		const req = new HttpRequest(
			'DELETE',
			`/api/file/delete/${proposal.proposalId}/${input}/${filename}`,
			deleteData, {
			reportProgress: true,
			responseType: 'text'
		});

		return this.http.request(req);
	}

	upload(file: File, proposal: Proposal, input: string) {
		const formdata: FormData = new FormData();
		formdata.append('file', file, file.name);
		formdata.append('proposalId', proposal.proposalId);
		formdata.append('name', input);

		const req = new HttpRequest('POST', `/api/file/upload/${input}`, formdata, {
			reportProgress: true,
			responseType: 'text'
		});
		return this.http.request(req);

	}

	getFiles(proposalId: string): Observable<any> {
		return this.http.get('/api/file/' + proposalId);
	}
}
