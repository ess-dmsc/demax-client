import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { MessageComponent } from "../../shared/message/message.component";
import { FileAdminService } from "./file-admin.service";
import { APP_CONFIG, AppConfig } from "../../app-config.module";
import { Proposal } from "../../models/proposal";

@Component({
	selector: 'app-file-admin',
	templateUrl: './file-admin.component.html',
	styleUrls: [ './file-admin.component.css' ]
})
export class FileAdminComponent implements OnInit {

	url = this.appConfig.demaxBaseUrl;
	displayedColumns: string[] = [ 'filename', 'options' ];

	isLoading = true;
	fileUploads: Observable<string[]>;

	files: string[] = [];

	progress: { percentage: number } = {percentage: 0};

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		private fileAdminService: FileAdminService,
		public message: MessageComponent
	) {
	}

	ngOnInit() {
		this.getFiles();
	}

	getFiles() {
		this.fileAdminService.getFiles().subscribe(
			data => {
				this.fileUploads = data;
				this.isLoading = false
			},
			error => {
				console.log(error);
				this.isLoading = false;
				this.message.setMessage(error.message, 'danger')
			}
		)
	}

	delete(filename: string) {
		this.isLoading = true;
		this.fileAdminService.deleteFile(filename).subscribe(
			() => {
				this.fileUploads = this.fileAdminService.getFiles();
				this.isLoading = false;
			}, error => {
				console.log(error);
				this.isLoading = false;
				this.message.setMessage(error.message, 'danger');
			}
		);
	}
}



