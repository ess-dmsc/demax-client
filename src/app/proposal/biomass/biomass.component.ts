import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
	selector: 'app-biomass',
	templateUrl: './biomass.component.html',
	styleUrls: [ './biomass.component.css', '../proposal-detail/proposal-detail.component.css' ]
})
export class BiomassComponent implements OnInit {
	@Input() proposalForm: FormGroup;
	@Output() uploaded = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

}
