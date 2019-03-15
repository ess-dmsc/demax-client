import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
	selector: 'app-protein',
	templateUrl: './protein.component.html',
	styleUrls: [ './protein.component.css', '../proposal-detail/proposal-detail.component.css' ]
})
export class ProteinComponent implements OnInit {
	@Input() proposalForm: FormGroup;
	@Output() uploaded = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

}
