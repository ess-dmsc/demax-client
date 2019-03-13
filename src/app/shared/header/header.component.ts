import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG, AppConfig } from "../../app-config.module";
import { AuthService } from "../../user/auth.service";
import { MessageComponent } from "../message/message.component";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	url = this.appConfig.demaxBaseUrl;

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		public auth: AuthService,
		public message: MessageComponent
	)
	{}

	ngOnInit() {
	}

}
