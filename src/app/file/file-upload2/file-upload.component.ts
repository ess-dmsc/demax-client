import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {Observable} from "rxjs";
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from "@angular/common/http";

@Component({
	selector: 'app-file-upload2',
	templateUrl: './file-upload.component.html',
	styleUrls: [ './file-upload.component.css']
})
export class FileUploadComponent2 implements OnInit {
	@Input() proposalId: string;
	@Output() uploaded = new EventEmitter();

	uploadForm: FormGroup;

	public uploader:FileUploader = new FileUploader({isHTML5: true});
	progress: { percentage: number } = {percentage: 0};

	constructor(private fb: FormBuilder, private http: HttpClient ) { }

	uploadSubmit(){
		for (let i = 0; i < this.uploader.queue.length; i++) {
			let fileItem = this.uploader.queue[i]._file;
			if(fileItem.size > 20000000){
				alert("The file is too big. Maximum allowed filesize is 20mb");
				return;
			}
		}
		for (let j = 0; j < this.uploader.queue.length; j++) {
			console.log(j)
			let data = new FormData();
			let fileItem = this.uploader.queue[j]._file;
			console.log(fileItem.name);
			data.append('file', fileItem);
			data.append('fileSeq', 'seq'+ j );
			data.append( 'attachmentType', this.uploadForm.controls.type.value);
			data.append('proposalId', this.proposalId);

			this.uploadFile(data).subscribe(
				event => {
					if(event.type === HttpEventType.UploadProgress) {
						this.progress.percentage = Math.round(100 * event.loaded / event.total);
					} else if(event instanceof HttpResponse) {
						this.uploaded.emit(true);
					}
				});
		}
		this.uploader.clearQueue();
		this.uploaded.emit(true);
	}

	uploadFile(data: FormData): Observable<HttpEvent<{}>> {

		const req = new HttpRequest(
			'POST',
			'/api/file/upload2', data, {reportProgress: true, responseType: 'text'}
		);

		return this.http.request(req);
	}

	ngOnInit() {
		this.uploadForm = this.fb.group({
			document: [null, null],
			type:  [null, Validators.compose([Validators.required])]
		});
	}

}