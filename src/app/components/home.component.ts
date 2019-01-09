import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
	selector: 'app-home',
	template: `
		<style>
			.wrapper {
				margin: 3rem;
			}

			.jumbotron {
				padding: 3rem;
				width: 800px;
			}
			table{
				width: 300px;
			}
		</style>
		<div class="wrapper" style="display: flex; flex-wrap: wrap; justify-content: space-evenly;">

			<div class="jumbotron jumbotron-fluid">
				<h1 class="display-4">Welcome</h1>
				<p class="lead">to the DEMAX user portal for deuteration & crystallization support!</p>
				<hr class="my-4">
				<p>Users are strongly encouraged to contact DEMAX staff prior to preparing and submitting a
					deuteration/crystallization proposal.
					<br>General enquiries can be sent to:
					<a href="mailto:demax@esss.se">demax@esss.se</a>
					or to one of the<a routerLink="/contact"> subject matter experts.</a></p>

				<p class="lead">
					<a class="btn btn-primary btn-lg" href="#" role="button" routerLink="/proposals">Create new
						proposal</a>
				</p>
				<br>
				<a href="http://localhost:8080/word/attachment">
					<button mat-raised-button class="btn btn-success">
						<mat-icon>get_app</mat-icon>
						Download proposal template
					</button>
				</a>
			</div>
			<mat-card>
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
				
				<p>*<em>Users should note that the contributions by DEMAX should be acknowledged in any publications containing materials obtained from us. For particularly challenging projects that require above average involvement from DEMAX, relevant DEMAX staff should be acknowledged through co-authorship of any subsequent publications.
				</em></p>
			</ul>
				<mat-action-row>
					<mat-checkbox style="margin: 2rem;">I acknowledge the terms and conditions above</mat-checkbox>
					<button mat-raised-button color="primary" routerLink="/proposals">
						Create new proposal
					</button>
				</mat-action-row>
			</mat-card>
			
		</div>

	`
})
export class HomeComponent implements OnInit {

	constructor(public auth: AuthService) {
	}



	ngOnInit() {
	}

}
