import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
	selector: 'app-crystallization',
	templateUrl: './crystallization.component.html',
	styleUrls: [ './crystallization.component.css' ]
})
export class CrystallizationComponent implements OnInit {
	@Input() proposalForm: FormGroup;

	constructor() {
	}

	ngOnInit() {
	}

}
