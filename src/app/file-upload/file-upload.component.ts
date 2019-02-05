import { Component, Input, OnInit } from '@angular/core';
import { FileService } from "../services/file.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Proposal } from "../models/proposal";
import { MessageComponent } from "../message/message.component";

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: [ './file-upload.component.css' ]
})
export class FileUploadComponent implements OnInit {
	@Input() proposal: Proposal;
	@Input() attachmentType: string;

	fileMessage="Choose file";
	fileIcon="folder_open";

	selectedFiles: FileList;
	currentFileUpload: File;
	progress: { percentage: number } = {percentage: 0};

	constructor(
		private fileService: FileService,
		public message: MessageComponent
	) {
	}

	ngOnInit() {
	}

	selectFile(event) {
		this.selectedFiles = event.target.files;
		this.currentFileUpload = this.selectedFiles.item(0);
		this.fileMessage = this.currentFileUpload.name;

		this.progress.percentage = 0;
		this.fileService.upload(this.currentFileUpload, this.proposal, this.attachmentType).subscribe(
			event => {
				this.fileIcon = "cloud_upload";
				if(event.type === HttpEventType.UploadProgress) {
					this.progress.percentage = Math.round(100 * event.loaded / event.total);
				} else if(event instanceof HttpResponse) {
					console.log('File is completely uploaded!');
					this.message.setMessage(this.currentFileUpload.name + ' was successfully uploaded', 'success');
				}
			},
			error => {
				this.message.setMessage(this.currentFileUpload.name + ' failed to upload', 'danger');

			}
		);
		this.fileMessage = "folder_open"
		this.fileMessage = "Choose file"
		this.selectedFiles = undefined;
	}

}
