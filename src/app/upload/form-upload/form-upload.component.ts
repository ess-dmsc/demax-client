import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private uploadService: UploadFileService, public auth: AuthService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
  	event.preventDefault();
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        console.log('File is completely uploaded!');
    });

    this.selectedFiles = undefined;
  }

}
