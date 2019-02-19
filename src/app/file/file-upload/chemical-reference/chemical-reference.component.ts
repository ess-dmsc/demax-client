import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { FileService } from "../../file.service";

@Component({
  selector: 'app-chemical-reference',
  templateUrl: './chemical-reference.component.html',
  styleUrls: [ './chemical-reference.component.css']
})
export class ChemicalReferenceComponent implements OnInit {
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
	}


	selectFile(event) {
		this.selectedFiles = event.target.files;
		this.upload();
	}

	upload() {
		this.progress.percentage = 0;
		this.currentFileUpload = this.selectedFiles.item(0);
		this.fileService.pushFileToStorage(this.currentFileUpload, this.proposalId, 'moleculePreparationReferenceArticle').subscribe(event => {
			if(event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if(event instanceof HttpResponse) {
				this.uploaded.emit(true);
			}
		});
		this.selectedFiles = undefined;
	}
}
