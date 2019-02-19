import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
	selector: 'app-file-upload3',
	templateUrl: './file-upload3.component.html',
	styleUrls: [ './file-upload3.component.css' ]
})
export class FileUpload3Component implements OnInit {
	@Input() proposalId: string;
	@Input() attachmentType: string;
	@Output() uploaded = new EventEmitter();

	uploadForm: FormGroup;

	public uploader: FileUploader = new FileUploader({isHTML5: true});
	progress: { percentage: number } = {percentage: 0};
	constructor(private fb: FormBuilder, private http: HttpClient) {
	}

	uploadSubmit2() {
		this.progress.percentage = 0;
		let fileItem = this.uploader.queue[ 0 ]._file;
		if(fileItem.size > 20000000) {
			alert("The file is too big. Maximum allowed filesize is 20mb");
			return;
		}

		let data = new FormData();
		console.log(fileItem.name);
		data.append('file', fileItem);
		data.append('attachmentType', this.attachmentType);
		data.append('proposalId', this.proposalId);

		this.uploadFile(data).subscribe(data => {
			console.log(data)
		}, event => {
			if(event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if(event instanceof HttpResponse) {
				this.uploaded.emit(true);
			}
		});
		console.log(fileItem)
		this.uploader.clearQueue();
		this.uploaded.emit(true);
		this.progress.percentage = 0;
	}


	uploadFile(data: FormData): Observable<HttpEvent<{}>> {

		const req = new HttpRequest(
			'POST',
			'/api/file/upload2', data, {reportProgress: true, responseType: 'text'}
		);

		return this.http.request(req);
	}

	uploadSubmit() {
		this.progress.percentage = 0;
		let fileItem = this.uploader.queue[ 0 ]._file;
		console.log(this.uploader.queue[0])
		if(fileItem.size > 20000000) {
			alert("The file is too big. Maximum allowed filesize is 20mb");
			return;
		}

		let data = new FormData();
		console.log(fileItem.name);
		data.append('file', fileItem);
		data.append('attachmentType', this.attachmentType);
		data.append('proposalId', this.proposalId);

		this.uploadFile(data).subscribe(event => {
			if(event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if(event instanceof HttpResponse) {
				this.uploaded.emit(true);
			}
		});
		this.uploader.clearQueue();
		this.uploaded.emit(true);
		this.progress.percentage = 0;
	}

	ngOnInit() {
		this.uploadForm = this.fb.group({
			document: [ null, null ],
			type: [ null, Validators.compose([ Validators.required ]) ]
		});
	}


}
