import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
	selector: 'app-crystallization',
	templateUrl: './crystallization.component.html',
	styleUrls: [ './crystallization.component.css', '../proposal-detail/proposal-detail.component.css' ]
})
export class CrystallizationComponent implements OnInit {
	@Input() proposalForm: FormGroup;
	@Output() uploaded = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

}
