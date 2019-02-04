import { Component, Input, OnInit } from '@angular/core';
import { FileService } from "../services/file.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Proposal } from "../models/proposal";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
	@Input() attachmentType: string;
	@Input() proposal: Proposal;

	selectedFiles: FileList;
	currentFileUpload: File;
	progress: { percentage: number } = { percentage: 0 };

	constructor(private fileService: FileService) { }

	ngOnInit() {
	}

	selectFile(event) {
		this.selectedFiles = event.target.files;
		console.log(this.attachmentType)
	}

	upload() {
		this.progress.percentage = 0;
		this.currentFileUpload = this.selectedFiles.item(0);
		this.fileService.pushFileToStorage(this.currentFileUpload, this.proposal, this.attachmentType ).subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if (event instanceof HttpResponse) {
				console.log('File is completely uploaded!');
			}
		});

		this.selectedFiles = undefined;
	}

}
