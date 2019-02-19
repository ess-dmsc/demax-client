import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from "../../file.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";

@Component({
  selector: 'app-chemical-structure',
  templateUrl: './chemical-structure.component.html',
  styleUrls: [ './chemical-structure.component.css']
})
export class ChemicalStructureComponent implements OnInit {
	@Input() proposalId: string;


	selectedFiles: FileList;
	currentFileUpload: File;

	progress: { percentage: number } = {percentage: 0};

	constructor(
		private fileService: FileService
	) {
	}

	ngOnInit() {
		this.progress.percentage = 0;
	}


	selectFile(event) {
		this.selectedFiles = event.target.files;
		console.log(event.target.name);
		this.upload();
	}

	upload() {
		this.progress.percentage = 0;
		this.currentFileUpload = this.selectedFiles.item(0);
		this.fileService.pushFileToStorage(this.currentFileUpload, this.proposalId, 'chemicalStructureAttachment').subscribe(event => {
			if(event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if(event instanceof HttpResponse) {
			}
		});
		this.selectedFiles = undefined;
	}
}
