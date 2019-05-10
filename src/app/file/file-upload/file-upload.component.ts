import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { MessageComponent } from "../../shared/message/message.component";

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: [ './file-upload.component.css' ]
})
export class FileUploadComponent implements OnInit {

	@Input() proposalId: string;
	@Input() attachmentType: string;
	@Input() textString: string;
	@Input() required: Boolean;
	@Output() uploaded = new EventEmitter();

	uploadForm: FormGroup;
	hasUploaded = false;
	uploadMessage = '';
	public uploader: FileUploader = new FileUploader({isHTML5: true});
	progress: { percentage: number } = {percentage: 0};
	constructor(private fb: FormBuilder, private http: HttpClient, private message: MessageComponent) {
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
		if(fileItem.size > 200000) {
			alert("The file is too big. Maximum allowed filesize is 20mb");
			return;
		}

		let data = new FormData();
		data.append('file', fileItem);
		data.append('attachmentType', this.attachmentType);
		data.append('proposalId', this.proposalId);

		this.uploadFile(data).subscribe(event => {
			if(event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if(event instanceof HttpResponse) {
				this.hasUploaded = true;
				this.uploaded.emit(true);
				this.message.setMessage('Uploaded ' + fileItem.name,'success');
				setTimeout(() => this.progress.percentage = 0, 3000);
				setTimeout(() => this.uploadMessage = '', 3000);
				setTimeout(() => this.hasUploaded = false, 3000);
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
