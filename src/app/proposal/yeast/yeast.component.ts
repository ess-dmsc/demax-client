import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
	selector: 'app-yeast',
	templateUrl: './yeast.component.html',
	styleUrls: [ './yeast.component.css', '../proposal-detail/proposal-detail.component.css' ]
})
export class YeastComponent implements OnInit {
	@Input() proposalForm: FormGroup;

	constructor() {
	}

	ngOnInit() {
	}

}
