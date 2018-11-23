import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contact',
	template: `
		<style>
			mat-card{
				width: 300px;
				padding: 1rem;
			}
			.wrapper{
				display: flex;
				justify-content: space-around;
			}
			td{
				margin: 1rem auto;
			}
		</style>
		<div class="wrapper">
			
		<mat-card>
			<mat-card-header>
				<mat-card-title>Dr. Zoë Fisher</mat-card-title>
				<mat-card-subtitle>
					Protein crystallization & biodeuteration
				</mat-card-subtitle>
			</mat-card-header>
			<mat-card-content>
				<img matCardImage src="../../assets/media/zoe-fisher.jpg">

				<table>
					<tr>
						<td>Mail</td>
						<td><a href="mailto:Zoe.Fisher@esss.se" class="spamspan">Zoe.Fisher@esss.se</a></td>
					</tr>
					<tr>
						<td>
							Phone
						</td>
						<td>
							<a href="tel:%2B46468883250">+46 46 888 32 50</a>
						</td>
					</tr>
					<tr>
						<td>
							Mobile
						</td>
						<td>
							<a href="tel:%2B46721792250">+46 72 179 22 50</a>
						</td>
					</tr>
				</table>
			</mat-card-content>
			<mat-card-actions>
			</mat-card-actions>
		</mat-card>
		<mat-card>
			<mat-card-header>
				<mat-card-title>Dr. Hanna Wacklin-Knecht</mat-card-title>
				<mat-card-subtitle>
					Chemical & lipid/surfactant deuteration
				</mat-card-subtitle>
			</mat-card-header>
			<mat-card-content>
				<img matCardImage src="../../assets/media/zoe-fisher.jpg">
				<table>
					<tr>
						<td>Mail</td>
						<td><a href="mailto:hanna.wacklin@esss.se">hanna.wacklin@esss.se</a></td>
					</tr>
					<tr>
						<td>
							Phone
						</td>
						<td>
							<a href="tel:%2B46468883044">+46 46 888 30 44</a>
						</td>
					</tr>
					<tr>
						<td>
							Mobile
						</td>
						<td>
							<a href="tel:%2B46721792044">+46 72 179 20 44</a>
						</td>
					</tr>
				</table>
			</mat-card-content>
			<mat-card-actions>
			</mat-card-actions>
		</mat-card>
		<mat-card>
			<mat-card-header>
				<mat-card-title>Dr. Anna Leung</mat-card-title>
				<mat-card-subtitle>
					Chemical deuteration & organic synthesis
				</mat-card-subtitle>
			</mat-card-header>
			<mat-card-content>
				<img matCardImage src="../../assets/media/zoe-fisher.jpg">

				<table>
					<tr>
						<td>Mail</td>
						<td>
							<a href="mailto:Anna.Leung@esss.se" class="spamspan">Anna.Leung@esss.se</a>
						</td>
					</tr>
					<tr>
						<td>
							Phone
						</td>
						<td>
							<a href="tel:%2B46468883427">+46 46 888 34 27</a>
						</td>
					</tr>
					<tr>
						<td>
							Mobile
						</td>
						<td>
							<a href="tel:%2B46721792427">+46 72 179 24 27</a>
						</td>
					</tr>
				</table>
			</mat-card-content>
			<mat-card-actions>
			</mat-card-actions>
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
