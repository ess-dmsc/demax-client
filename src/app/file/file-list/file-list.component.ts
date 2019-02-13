import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { FileService } from "../file.service";
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

	constructor(private fileService: FileService, public message: MessageComponent) {
	}
/*
	ngOnInit() {
		this.fileUploads = this.fileService.getFiles();
	}

	getFiles(uploaded) {
		this.fileUploads = this.fileService.getFiles();
	}

	delete(filename: string) {
		this.isLoading = true;
		this.fileService.deleteFile().subscribe(
			() => {
				this.fileUploads = this.fileService.getFiles();
			}, error => {
				console.log(error)
			}
		);
		this.isLoading = false;
	}
*/

	ngOnInit() {
	}
}

