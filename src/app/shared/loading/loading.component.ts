import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: [ './loading.component.css']
})
export class LoadingComponent implements OnInit {
	@Input() condition: boolean;
	@Input() nameOfDataThatIsLoading: string;

  constructor() { }

  ngOnInit() {
  	console.log(this.nameOfDataThatIsLoading)
  }

}
