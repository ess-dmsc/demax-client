import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
	selector: 'app-file-upload2',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent2 implements OnInit {
	@Input() proposalId: string;
	@Output() uploaded = new EventEmitter();

	uploadForm: FormGroup;

	public uploader:FileUploader = new FileUploader({isHTML5: true});

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

			this.uploadFile(data).subscribe(data => alert(data.message));
		}
		this.uploader.clearQueue();
		this.uploaded.emit(true);
	}

	uploadFile(data: FormData): Observable<any> {
		return this.http.post<any>('/api/file/upload2', data);
	}

	ngOnInit() {
		this.uploadForm = this.fb.group({
			document: [null, null],
			type:  [null, Validators.compose([Validators.required])]
		});
	}

}
