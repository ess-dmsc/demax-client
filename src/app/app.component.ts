import { Component, OnInit, Inject, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AppConfig } from "./app-config.module";
import { APP_CONFIG } from "./app-config.module";
import { FormControl } from "@angular/forms";
import { AuthService } from "./user/auth.service";
import { MessageComponent } from "./shared/message/message.component";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewChecked {
	url = this.appConfig.demaxBaseUrl;
	title = 'demax-client';
	opened: boolean;
	mode = new FormControl('over');
	
	constructor(
		public auth: AuthService,
		private changeDetector: ChangeDetectorRef,
		public message: MessageComponent,
		@Inject(APP_CONFIG) private appConfig: AppConfig

	) {
	}

	ngAfterViewChecked() {
		this.changeDetector.detectChanges();
	}


}
