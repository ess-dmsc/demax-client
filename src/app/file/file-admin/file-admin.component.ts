import { Component, OnInit } from '@angular/core';
import { UploadFileService } from "../upload-file.service";
import { Observable } from "rxjs";
import { MessageComponent } from "../../shared/message/message.component";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Attachment } from "../../models/attachment";

@Component({
  selector: 'app-file-admin',
  templateUrl: './file-admin.component.html',
  styleUrls: [ './file-admin.component.css']
})
export class FileAdminComponent implements OnInit {

	displayedFileColumns: string[] = [ 'filename', 'attachmentType', 'size', 'fileType', 'options' ];

	isLoading = false;

	files: Attachment[] = [];

	fileUploads: Observable<string[]>;

	selectedFiles: FileList;
	currentFileUpload: File;

	progress: { percentage: number } = {percentage: 0};

	constructor(private uploadService: UploadFileService, public message: MessageComponent) {
	}

	ngOnInit() {
		this.getFiles();
	}

	getFiles() {
		window.scrollTo(0, 0)
		this.uploadService.getFilesAsObjects().subscribe(
			data => {this.files = data; this.isLoading = false},
			error => console.log(error),
		);

	}

	selectFile(event) {
		this.selectedFiles = event.target.files;
		this.upload();
	}

	upload() {
		this.isLoading = true;
		this.progress.percentage = 0;
		this.currentFileUpload = this.selectedFiles.item(0);
		this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
			if(event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if(event instanceof HttpResponse) {
				this.message.setMessage('Uploaded ' + this.currentFileUpload.name, 'success')
				this.fileUploads = this.uploadService.getFiles();
				this.isLoading = false;
			}
		});
		this.selectedFiles = undefined;
	}

	delete(filename: string) {
		this.isLoading = true;
		this.uploadService.deleteFile(filename).subscribe(
			() => {
				this.fileUploads = this.uploadService.getFiles();
			}, error => {
				console.log(error)
			}
		);
		this.isLoading = false;
	}

}

