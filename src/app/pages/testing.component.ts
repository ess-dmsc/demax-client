import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from "../services/test.service";
import { AuthService } from "../services/auth.service";
import { ProposalService } from "../proposal.service";
import { FormControl } from "@angular/forms";

@Component({
	selector: 'app-testing',
	template: `
		<mat-card>
			<mat-card-header>
				<mat-card-title>TestComponent</mat-card-title>
			</mat-card-header>
			<mat-card-content>
				<form enctype="multipart/form-data" method="post">
					<div>
						<label for="picked">Attach reference</label>
						<div>
							<input type="file" id="picked" #picked
							       (click)="message=''"
							       (change)="onPicked(picked)">
						</div>
						<br>
						<mat-divider></mat-divider>
						<br>
						<mat-form-field>
							<input matInput [matDatepicker]="picker" placeholder="Choose a date" [formControl]="date">
							<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
							<mat-datepicker #picker></mat-datepicker>
						</mat-form-field>
					</div>
					<p *ngIf="message">{{message}}</p>
				</form>

				{{date.value}}
			</mat-card-content>
		</mat-card>

	`,
	providers: [ TestService ]

})
export class TestingComponent {
	date = new FormControl(new Date());
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