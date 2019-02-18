import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { MessageComponent } from "../../shared/message/message.component";
import { FileAdminService } from "../file-admin.service";

@Component({
  selector: 'app-file-admin',
  templateUrl: './file-admin.component.html',
  styleUrls: [ './file-admin.component.css']
})
export class FileAdminComponent implements OnInit {

	isLoading = false;
	fileUploads: Observable<string[]>;

	progress: { percentage: number } = {percentage: 0};

	constructor(private fileAdminService: FileAdminService, public message: MessageComponent) {
	}
		ngOnInit() {
			this.fileUploads = this.fileAdminService.getFiles();
		}

		getFiles() {
			this.fileUploads = this.fileAdminService.getFiles();
		}

		delete(filename: string) {
			this.isLoading = true;
			this.fileAdminService.deleteFile(filename).subscribe(
				() => {
					this.fileUploads = this.fileAdminService.getFiles();
				}, error => {
					console.log(error)
				}
			);
			this.isLoading = false;
		}
}



