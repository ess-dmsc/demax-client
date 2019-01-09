import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contact',
	template: `
		<style>
			h4 {
				margin: 1rem;
			}

			p {
				margin: 0.5rem;
			}

			img {
				margin: 1rem auto;
			}
		</style>
		<div style="display: flex; justify-content: space-evenly; flex-wrap: wrap; padding: 5rem 2rem;">
			<mat-card>
				<mat-action-row>
					<h4>Dr. Zoë Fisher</h4>
					<p>Protein crystallization & biodeuteration</p>
				</mat-action-row>
				<table>
					<tr>
						<td>
							<img src="../../assets/media/zoe.png" width="150" alt="Card image cap">

						</td>
						<td>
							<ul class="list-group list-group-flush">
								<li class="list-group-item"><a href="mailto:Zoe.Fisher@esss.se" class="spamspan">Zoe.Fisher@esss.se</a>
								</li>
								<li class="list-group-item"><a href="tel:%2B46468883250">+46 46 888 32 50</a></li>
								<li class="list-group-item"><a href="tel:%2B46721792250">+46 72 179 22 50</a></li>
							</ul>
						</td>
					</tr>
				</table>
			</mat-card>
			<mat-card>
				<mat-action-row>
					<h4>Dr. Hanna Wacklin-Knecht</h4>
					<p>Chemical & lipid/surfactant deuteration</p>
				</mat-action-row>
				<table>
					<tr>
						<td>
							<img src="../../assets/media/hanna.jpeg" width="150" alt="Card image cap">

						</td>
						<td>
							<ul class="list-group list-group-flush">
								<li class="list-group-item"><a
										href="mailto:hanna.wacklin@esss.se">hanna.wacklin@esss.se</a></li>
								<li class="list-group-item"><a href="tel:%2B46468883044">+46 46 888 30 44</a></li>
								<li class="list-group-item"><a href="tel:%2B46721792044">+46 72 179 20 44</a></li>
							</ul>
						</td>
					</tr>
				</table>
			</mat-card>
			<mat-card>
				<mat-action-row>
					<h4>Dr. Anna Leung</h4>
					<p>Chemical deuteration & organic synthesis</p>
				</mat-action-row>
				<table>
					<tr>
						<td>
							<img src="../../assets/media/anna.png" width="150" alt="Card image cap">

						</td>
						<td>
							<ul class="list-group list-group-flush">
								<li class="list-group-item"><a href="mailto:Anna.Leung@esss.se"
								                               class="spamspan">Anna.Leung@esss.se</a></li>
								<li class="list-group-item"><a href="tel:%2B46468883427">+46 46 888 34 27</a></li>
								<li class="list-group-item"><a href="tel:%2B46721792427">+46 72 179 24 27</a></li>
							</ul>
						</td>
					</tr>
				</table>
			</mat-card>
		</div>
	`
})
export class ContactComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
