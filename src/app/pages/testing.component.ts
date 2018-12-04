import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from "../services/test.service";
import { AuthService } from "../services/auth.service";
import { ProposalService } from "../proposal.service";

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
		<h3>Pick a date</h3>
		<mat-form-field>
			<input matInput [matDatepicker]="picker" placeholder="Choose a date" id="date">
			<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
			<mat-datepicker #picker></mat-datepicker>
		</mat-form-field>
		{{matDatepicker}}
	`,
	providers: [ TestService ]

})
export class TestingComponent {

	message: string;

	constructor(private uploaderService: TestService, public auth: AuthService, public proposalService: ProposalService) {
	}

	onPicked(input: HTMLInputElement) {
		const file = input.files[ 0 ];
		console.log(file.name);
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


//name="{{proposalService.currentProposal._id + '-' + auth.currentUser._id}}"