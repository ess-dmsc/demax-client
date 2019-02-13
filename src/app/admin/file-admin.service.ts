import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Attachment } from "../models/attachment";

@Injectable({
	providedIn: 'root'
})
export class FileAdminService {
	constructor(private http: HttpClient) {
	}

	pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();

		formdata.append('file', file);

		const req = new HttpRequest('POST', '/api/admin/file/upload', formdata, {
			reportProgress: true,
			responseType: 'text'
		});

		return this.http.request(req);
	}

	getFiles(): Observable<any> {
		return this.http.get('/api/admin/file/all');
	}

	getFilesAsObjects(): Observable<Attachment[]> {
		return this.http.get<Attachment[]>('/api/admin/file/all/object')
	}

	getFile(filename: string): Observable<any> {
		return this.http.get('/api/admin/file/download/' + filename)
	}

	deleteFile(filename: string): Observable<any> {
		return this.http.delete('/api/admin/file/delete/' + filename)
	}
}