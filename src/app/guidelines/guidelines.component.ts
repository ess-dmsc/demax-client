import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG, AppConfig } from "../app-config.module";

@Component({
	selector: 'app-guidelines',
	templateUrl: './guidelines.component.html',
	styleUrls: [ './guidelines.component.css' ]
})
export class GuidelinesComponent implements OnInit {
	url = this.appConfig.demaxBaseUrl;

	constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {
	}

	ngOnInit() {
	}

}
