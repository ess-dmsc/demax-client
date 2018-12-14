import { Component, OnInit, Inject, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AppConfig } from "./app-config.module";
import { APP_CONFIG } from "./app-config.module";
import { AuthService } from "./services/auth.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewChecked {
	title = 'demax-client';
	opened: boolean;


	constructor(
		public auth: AuthService,
		private changeDetector: ChangeDetectorRef,
		@Inject(APP_CONFIG) private appConfig: AppConfig

	) {
	}

	ngAfterViewChecked() {
		this.changeDetector.detectChanges();
	}


}
