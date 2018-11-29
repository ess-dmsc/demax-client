import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from "../services/test.service";

@Component({
	selector: 'app-testing',
	template: `
		<h3>Upload file</h3>
		<form enctype="multipart/form-data" method="post">
			<div>
				<label for="picked">Choose file to upload</label>
				<div>
					<input type="file" id="picked" #picked
					       (click)="message=''"
					       (change)="onPicked(picked)">
				</div>
			</div>
			<p *ngIf="message">{{message}}</p>
		</form>

	`,
	providers: [ TestService ]

})
export class TestingComponent {

	message: string;

	constructor(private uploaderService: TestService) {
	}

	onPicked(input: HTMLInputElement) {
		const file = input.files[ 0 ];
		if(file) {
			this.uploaderService.upload(file).subscribe(
				msg => {
					input.value = null;
					this.message = msg;
				}
			);
		}
	}
}


