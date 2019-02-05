import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
	date = new FormControl(new Date());
	message: string;
	myForm: FormGroup;

	constructor(
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

	getFiles(): Observable<any> {
		return this.http.get(`http://localhost:8080/api/files/`);
	}

	deleteFile(file: String):
		Observable<any> {
		return this.http.delete(`/api/files/`);
	}


}
