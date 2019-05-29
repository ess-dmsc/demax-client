import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { ProposalService } from "../proposal/proposal.service";
import { Cycle } from "../models/cycle";
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	url = this.appConfig.demaxBaseUrl;
	activeCycle: Cycle;
	subscription: Subscription;
	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		private proposalService: ProposalService
	) {
	}
	ngOnInit() {
		this.proposalService.getActiveCycle().subscribe(
			response => {
				this.activeCycle = response;
			}, error => {
				console.log(error)
			}
		)
	}

}
