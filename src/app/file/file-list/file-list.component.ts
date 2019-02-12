import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UploadFileService } from "../upload-file.service";
import { MessageComponent } from "../../shared/message/message.component";

@Component({
	selector: 'app-file-list',
	templateUrl: './file-list.component.html',
	styleUrls: [ './file-list.component.css' ]
})
export class FileListComponent implements OnInit {
	@Input() proposalId: string;

	isLoading = false;
	fileUploads: Observable<string[]>;

	progress: { percentage: number } = {percentage: 0};

	constructor(private uploadService: UploadFileService, public message: MessageComponent) {
	}

	ngOnInit() {
		this.fileUploads = this.uploadService.getFiles();
	}

	getFiles(uploaded){
		this.fileUploads = this.uploadService.getFiles();
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

