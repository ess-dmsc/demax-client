import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
	selector: 'app-biosafety',
	templateUrl: './biosafety.component.html',
	styleUrls: [ './biosafety.component.css']
})
export class BiosafetyComponent implements OnInit {
	@Input() proposalForm: FormGroup;

	constructor() {
	}

	ngOnInit() {
	}

}
