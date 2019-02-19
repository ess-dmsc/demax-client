import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Proposal } from "../../models/proposal";

@Injectable({
	providedIn: 'root'
})
export class FileAdminService {
	constructor(private http: HttpClient) {
	}

	pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();

		formdata.append('file', file);

		const req = new HttpRequest('POST', '/api/admin/files/upload', formdata, {
			reportProgress: true,
			responseType: 'text'
		});

		return this.http.request(req);
	}

	getFiles(): Observable<any> {
		return this.http.get('/api/admin/files');
	}

	getFile(filename: string): Observable<any> {
		return this.http.get('/api/admin/files/download/' + filename)
	}

	deleteFile(filename: string): Observable<any> {
		return this.http.delete('/api/admin/file/delete/' + filename)
	}
}