import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {
	@Input() file: string;

  constructor() { }

  ngOnInit() {
  }

}
