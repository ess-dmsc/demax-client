import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG, AppConfig } from "../app-config.module";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	url = this.appConfig.demaxBaseUrl;

	constructor(@Inject(APP_CONFIG) private appConfig: AppConfig,
	) {
	}

	ngOnInit() {
	}

}
