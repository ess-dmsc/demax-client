import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
	selector: 'app-home',
	template: `
		<mat-card style="max-width: 900px; margin: 0;">
			<mat-card-header>
				<mat-card-title>Welcome to the DEMAX user portal for deuteration & crystallization
					support!
				</mat-card-title>

			</mat-card-header>
			<mat-card-content>
				<p> Users are strongly encouraged to contact DEMAX staff prior to preparing and submitting a
					deuteration/crystallization proposal. General enquiries can be sent to: <a
							href="mailto:demax@esss.se">demax@esss.se</a>
					or to one of the<a routerLink="/contact"> subject matter experts.</a></p>
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
				</ul>
			</mat-card-content>
			<mat-card-actions>
				<button class="btn btn-primary" style="margin: 2rem 4rem;" routerLink="/proposal-detail">Create new proposal</button>
				<button class="btn btn-danger" routerLink="/proposals">Edit existing proposal</button>
			</mat-card-actions>
		</mat-card>
	`
})
export class HomeComponent implements OnInit {

	constructor(public auth: AuthService) {
	}

	ngOnInit() {
	}
}
