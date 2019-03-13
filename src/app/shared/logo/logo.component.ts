import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: [ './logo.component.css']
})
export class LogoComponent implements OnInit {
	@Input() color: string;
	@Input() height: string;
	@Input() width: string;
	@Input() viewBox: string;

  constructor() { }

  ngOnInit() {
  	console.log(this.color)
  }

}
