import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { Proposal } from "../proposal";

@Injectable({
	providedIn: 'root'
})
export class UploadFileService {


	constructor(private http: HttpClient, public auth: AuthService) {
	}

	pushFileToStorage(file: File, proposal: Proposal): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file, proposal.proposalId);

		const req = new HttpRequest('POST', 'http://localhost:8080/api/file/upload', formdata, {
			reportProgress: true,
			responseType: 'text'
		});

		return this.http.request(req);
	}

	getFiles(): Observable<any> {
		return this.http.get('http://localhost:8080/api/file/all');
	}

	deleteFile(file: File): Observable<any> {
		return this.http.delete('http://localhost:8080/api/file/' + file.name, {responseType: 'text'});
	}
}
