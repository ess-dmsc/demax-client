import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
	selector: 'app-chemical',
	templateUrl: './chemical.component.html',
	styleUrls: [ './chemical.component.css', '../proposal-detail/proposal-detail.component.css' ]
})
export class ChemicalComponent implements OnInit {
	@Input() proposalForm: FormGroup;
	@Output() uploaded = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

}
