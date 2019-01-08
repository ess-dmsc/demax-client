import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-new-proposal',
	template:`<mat-card>
		<ul>
			<li> Proposals should be written in English, properly referenced, and prepared in the <a
					href="http://localhost:8080/word/attachment">Word template.</a> Please keep to the 2
				page limit, including Summary, Background (Science Case, Practical Consideration, References,
				Figures/Tables)
			</li>
			<li> Access to DEMAX is granted on the basis of both a technical and a peer-review process.</li>
			<li> Proposals awarded during initial operations (2019-2022) will be free of charge. During formal
				user
				operations (beyond 2023) we reserve the right to ask for partial financial contributions towards
				consumables
				& shipping costs.
			</li>
			<li> During initial operations we will not limit access to DEMAX based on ESS-membership. Beyond
				this
				period
				we
				will respect the user access policy that will be applicable ESS-wide.
			</li>
			<li> Biological and chemical deuteration proposals are run as a service but users for protein
				crystallization
				are welcome to come in person as well.
			</li>
			<li>
				Proposals awarded during initial operations (2019-2021) will be free of charge. During formal user operations (beyond 2023) we reserve the right to ask for partial financial contributions towards consumables & shipping costs.
				Options
			</li>
			<br>
			<p>*<em>Users should note that the contributions by DEMAX should be acknowledged in any publications containing materials obtained from us. For particularly challenging projects that require above average involvement from DEMAX, relevant DEMAX staff should be acknowledged through co-authorship of any subsequent publications.
			</em></p>
		</ul>
		<mat-action-row>
			<mat-checkbox style="margin: 2rem;">I acknowledge the terms and conditions above</mat-checkbox>
			<br>
			<button style="margin: 2rem;" mat-raised-button color="primary">Create new proposal</button>
		</mat-action-row>
	</mat-card>`
})
export class NewProposalComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
