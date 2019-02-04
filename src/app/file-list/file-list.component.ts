import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { FileService } from "../services/file.service";

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
	@Input() proposalId: string;

	showFile = false;
	fileUploads: Observable<string[]>;

	constructor(private fileService: FileService) { }

	ngOnInit() {
	}

	showFiles(enable: boolean) {
		this.showFile = enable;
		console.log(this.proposalId)
		if (enable) {
			this.fileUploads = this.fileService.getFiles(this.proposalId);
		}
		console.log(this.fileUploads)
	}
}