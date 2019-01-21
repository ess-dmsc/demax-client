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
					<a class="btn btn-primary btn-lg" href="#" role="button" routerLink="/proposal">Create new
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
			<div style="width: 300px;">
				<mat-action-row>Upcoming deadlines</mat-action-row>
				<table mat-table [dataSource]="cycles" class="mat-elevation-z8" style="width: 100%;">
					<ng-container matColumnDef="cycleId">
						<th mat-header-cell *matHeaderCellDef> Cycle ID</th>
						<td mat-cell *matCellDef="let cycle"> {{cycle.cycleId}}</td>
					</ng-container>

					<ng-container matColumnDef="date">
						<th mat-header-cell *matHeaderCellDef> Date </th>
						<td mat-cell *matCellDef="let cycle"> {{cycle.date}}</td>
					</ng-container>

					<ng-container matColumnDef="review">
						<th mat-header-cell *matHeaderCellDef> Review</th>
						<td mat-cell *matCellDef="let cycle"> {{cycle.review}}</td>
					</ng-container>

					<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
					<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
				</table>
			</div>
		</div>

	`
})
export class HomeComponent implements OnInit {

	constructor(public auth: AuthService) {
	}

	displayedColumns: string[] = [ 'cycleId', 'date', 'review' ];

	ngOnInit() {
	}

	cycles: object[] = [
		{
			cycleId: '001',
			date: '2018-02-01',
			review: '2018-03-01'
		},
		{
			cycleId: '002',
			date: '2018-04-01',
			review: '2018-05-01'
		},
		{
			cycleId: '003',
			date: '2018-05-01',
			review: '2018-06-01'
		}
	];
}
