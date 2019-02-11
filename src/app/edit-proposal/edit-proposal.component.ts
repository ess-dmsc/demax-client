import { Component, Input, OnInit } from '@angular/core';
import { Proposal} from "../models/proposal";

@Component({
  selector: 'app-edit-proposal',
  templateUrl: './edit-proposal.component.html',
  styleUrls: ['./edit-proposal.component.css']
})
export class EditProposalComponent implements OnInit {
	@Input() proposal: Proposal;

	constructor() { }

	ngOnInit() {

	}

}
