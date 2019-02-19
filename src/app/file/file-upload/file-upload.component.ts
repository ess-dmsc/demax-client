import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { FileService } from "../file.service";

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: [ './file-upload.component.css' ]
})
export class FileUploadComponent implements OnInit {
	@Input() attachmentType: string;
	@Input() proposalId: string;

	@Output() uploaded = new EventEmitter();

	selectedFiles: FileList;
	currentFileUpload: File;
	message = '';

	progress: { percentage: number } = {percentage: 0};

	constructor(
		private fileService: FileService
	) {
	}

	ngOnInit() {
		this.progress.percentage = 0;
		console.log(this.attachmentType)
	}


	selectFile(event) {
		this.selectedFiles = event.target.files;
		this.upload();
	}

	upload() {
		this.progress.percentage = 0;
		this.currentFileUpload = this.selectedFiles.item(0);
		this.fileService.pushFileToStorage(this.currentFileUpload, this.proposalId, this.attachmentType).subscribe(event => {
			if(event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if(event instanceof HttpResponse) {
				this.uploaded.emit(true);
			}
		});
		this.selectedFiles = undefined;
	}
}
