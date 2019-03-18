import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from "../../user/auth.service";
import { APP_CONFIG, AppConfig } from "../../app-config.module";

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.css' ]
})
export class SidebarComponent implements OnInit {

	url = this.appConfig.demaxBaseUrl;

	constructor(
		public auth: AuthService,
		@Inject(APP_CONFIG) private appConfig: AppConfig
	) {
	}

	ngOnInit() {
	}

}
