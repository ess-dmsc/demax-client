import { Component, Input, OnInit } from '@angular/core';
import { Attachment } from "../../models/attachment";

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: [ './file-detail.component.css']
})
export class FileDetailComponent implements OnInit {
	@Input() attachment: Attachment;

  constructor() { }

  ngOnInit() {
  }

}
