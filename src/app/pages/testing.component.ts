import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from "../services/test.service";
import { AuthService } from "../services/auth.service";
import { ProposalService } from "../proposal.service";
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from "@angular/forms";
import { Proposal } from '../models/proposal';
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

			mat-form-field {
				margin: 1rem;
			}
		</style>
		<mat-card style="width: 50%; margin: 2rem auto;">
			<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
				<mat-action-row><h4>Test form</h4></mat-action-row>
				<mat-form-field>
					<input matInput formControlName="email" placeholder="Email">
				</mat-form-field>
				<mat-form-field>
					<input matInput formControlName="message" placeholder="Message">
				</mat-form-field>
				<div formArrayName="coProposers">
					<div *ngFor="let coProposer of coProposerForms.controls; let i=index" [formGroupName]="i">
						<mat-card style="display: flex; flex-wrap: wrap; justify-content: space-around;">
						<span>
							
									<mat-form-field style="display: inline; width: 50%;">
										<input matInput formControlName="firstName" placeholder="First name">
									</mat-form-field>
									<mat-form-field style="display: inline; width: 50%;">
										<input matInput formControlName="lastName" placeholder="Last name">
									</mat-form-field>
									<mat-form-field>
										<input matInput formControlName="email" placeholder="Email">
									</mat-form-field>
									<mat-form-field>
										<input matInput formControlName="affiliation" placeholder="Affiliation">
									</mat-form-field>
													</span>

							<span>
																		<button (click)="deleteCoProposer(i)">Delete</button>

								</span>
						</mat-card>

					</div>
				</div>

				<button (click)="addCoProposer()">Add Co-Proposer</button>


				<mat-form-field style="width: 50%;">
					<input matInput [matDatepicker]="picker" placeholder="Choose a date" [formControl]="date">
					<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
					<mat-datepicker #picker></mat-datepicker>
				</mat-form-field>
				<mat-action-row>
					<button mat-raised-button class="btn btn-success" type="submit">Submit</button>
				</mat-action-row>
			</form>
		</mat-card>

	`,
	providers: [ TestService ]

})
export class TestingComponent implements OnInit {
	date = new FormControl(new Date());
	message: string;
	myForm: FormGroup;

	constructor(
		private uploaderService: TestService,
		public auth: AuthService,
		private http: HttpClient,
		private fb: FormBuilder
	) {
	}

	onSubmit() {
		console.log(this.myForm.value)
	}

	ngOnInit() {
		this.myForm = this.fb.group({
			email: '',
			message: '',
			coProposers: this.fb.array([])
		})
	}

	get coProposerForms() {
		return this.myForm.get('coProposers') as FormArray
	}

	addCoProposer() {
		event.preventDefault();
		const coProposer = this.fb.group({
			firstName: [],
			lastName: [],
			email: [],
			affiliation: []
		})

		this.coProposerForms.push(coProposer);
	}

	deleteCoProposer(i) {
		this.coProposerForms.removeAt(i)
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

	deleteFile(file: String):
		Observable<any> {
		return this.http.delete(`/api/files/`);
	}


}
