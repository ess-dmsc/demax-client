import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from '../upload-file.service';
import { Proposal } from "../../../proposal";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: 'list-upload',
	templateUrl: './list-upload.component.html',
	styleUrls: [ './list-upload.component.css' ]
})
export class ListUploadComponent implements OnInit {

	fileUploads: Observable<string[]>;

	constructor(private uploadService: UploadFileService, private http: HttpClient) {
	}

	ngOnInit() {
		this.fileUploads = this.uploadService.getFiles();
	}

	showFiles() {
		this.fileUploads = this.uploadService.getFiles();
		console.log(this.fileUploads)
	}
}
