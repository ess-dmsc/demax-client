import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
	selector: 'app-home',
	template: `
		<style>
			.main {
				padding: 4rem;
				width: 750px;
			}

			.small-action {
				margin-right: 2rem;
			}

			.wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}

			.deadlines {
				margin-top: 2rem;
			}
			td{
				margin: 0.5rem;
			}
		</style>
		<div class="wrapper">
			<div class="jumbotron jumbotron-fluid main">
				<h1 class="display-4">Welcome</h1>
				<p class="lead">to the DEMAX user portal for deuteration & crystallization support!</p>
				<hr class="my-4">
				<p>Users are strongly encouraged to contact DEMAX staff prior to preparing and submitting a
					deuteration/crystallization proposal.
					<br>General enquiries can be sent to:
					<a href="mailto:demax@esss.se">demax@esss.se</a>
					or to one of the<a routerLink="/contact"> subject matter experts.</a></p>

				<p class="lead">
					<a class="btn btn-primary btn-lg" href="#" role="button" routerLink="/proposal">Create new
						proposal</a>
				</p>
				<br>
				<a class="small-action" href="http://scicat02.esss.lu.se:3000/word/attachment">
					<button mat-raised-button class="btn btn-success">
						<mat-icon>get_app</mat-icon>
						Download proposal template
					</button>
				</a>
				<a class="small-action" routerLink="/guidelines">
					<button mat-raised-button class="btn btn-primary">
						<mat-icon>info</mat-icon>
						Read the proposal guidelines
					</button>
				</a>
			</div>
			<div class="deadlines">
				<mat-card>
					<h4>Important dates</h4>
					<mat-card-content>
						<table>
							<tr>
								<td>
									Proposal submission:
								</td>
								<td>
									25 February - 5 April
								</td>
							</tr>
							<mat-divider></mat-divider>
							<tr>
								<td>
									Review:
								</td>
								<td>
									5 April - 6 May
								</td>
							</tr>
							<mat-divider></mat-divider>

							<tr>
								<td>
									Notify users:
								</td>
								<td>
									6 - 31 May
								</td>
							</tr>
							<mat-divider></mat-divider>
							<tr>
								<td>Run cycle:</td>
								<td>June - November</td>

							</tr>
							<mat-divider></mat-divider>
							<tr>
								<td>Wrap-up & user survey:</td>
								<td>December</td>
							</tr>
						</table>
					</mat-card-content>

				</mat-card>

			</div>
		</div>
	`
})
export class HomeComponent implements OnInit {

	constructor(public auth: AuthService) {
	}


	ngOnInit() {
	}

}
