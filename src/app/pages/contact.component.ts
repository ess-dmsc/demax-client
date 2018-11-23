import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contact',
	template: `
		<style>
			mat-card{
				width: 300px;
			}
			.wrapper{
				display: flex;
				justify-content: space-around;
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
			<img matCardImage src="../../assets/media/zoe-fisher.jpg">
			<mat-card-content>
				<table>
					<tr>
						<td></td>
						<td></td>
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
			<img matCardImage src="../../assets/media/zoe-fisher.jpg">
			<mat-card-content>
				<table>
					<tr>
						<td></td>
						<td></td>
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
			<img matCardImage src="../../assets/media/zoe-fisher.jpg">
			<mat-card-content>
				<table>
					<tr>
						<td></td>
						<td></td>
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
