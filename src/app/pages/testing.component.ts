import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from "../services/test.service";
import { AuthService } from "../services/auth.service";
import { ProposalService } from "../proposal.service";
import { FormControl } from "@angular/forms";
import { Proposal } from '../proposal';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: 'app-testing',
	template: `
		<style>
			.custom-file-input {
				border: solid black 1px;
				background-color: #00BBFF;
			}

			#pbdIdReferenceAttachment {
				box-shadow: 3px 3px 3px black;
			}
		</style>
		<mat-card>
			<mat-card-header>
				<mat-card-title>TestComponent</mat-card-title>
			</mat-card-header>
			<mat-card-content>
				<form enctype="multipart/form-data" method="post">
					<div>
						<label for="picked">Attach reference</label>
						<div>
							<input type="file" id="picked" name="needByDateAttachment" #picked (click)="message=''"
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
				<form-upload></form-upload>
				<list-upload></list-upload>
			</mat-card-content>
		</mat-card>

	`,
	providers: [ TestService ]

})
export class TestingComponent {
	date = new FormControl(new Date());
	message: string;
	templateString: 'huffe';
	private proposal: Proposal;

	constructor(
		private uploaderService: TestService,
		public auth: AuthService,
		private http: HttpClient
	) {
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

	getFiles(): Observable<any> {
		return this.http.get(`http://localhost:8080/api/files/`);
	}
	deleteFile( file: String): Observable<any> {
		return this.http.delete(`/api/files/`);
	}
}


//name="{{proposalService.currentProposal._id + '-' + auth.currentUser._id}}"