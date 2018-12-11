import { Component, OnInit, Input } from '@angular/core';
import { UploadFileService } from "../upload-file.service";
import { Proposal } from "../../proposal";

@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {
  @Input() fileUpload: string;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

	deleteFile(file: File) {
  	event.preventDefault();
		if(window.confirm('Are you sure you want to delete this file?')) {

			this.uploadService.deleteFile(file).subscribe(
				() => {
				},
				error => console.log(error)
			);
		}
	}

}
