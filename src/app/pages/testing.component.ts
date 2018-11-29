import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-not-found',
	template:`<form action="/upload" enctype="multipart/form-data" method="post">
    <input type="file" name="upload" multiple>
    <input type="submit" value="Upload">
</form>
  `
})
export class TestingComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}


