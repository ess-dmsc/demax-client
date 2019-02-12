import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs";
import { UploadFileService } from "../upload-file.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { MessageComponent } from "../../shared/message/message.component";
import { FileService } from "../../services/file.service";
import { Proposal } from "../../models/proposal";

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

	progress: { percentage: number } = {percentage: 0};

	constructor(private uploadService: UploadFileService, public message: MessageComponent,
	            private fileService: FileService
	) {
	}

	ngOnInit() {
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
				this.message.setMessage('Uploaded ' + this.currentFileUpload.name, 'success');
				this.uploaded.emit(true);
			}
		});
		this.selectedFiles = undefined;
	}
}
