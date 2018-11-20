import { Component, OnInit, Inject } from '@angular/core';
import { AppConfig } from "./app-config.module";
import { APP_CONFIG } from "./app-config.module";
import { FormControl } from "@angular/forms";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	title = 'demax-client';
	mode = new FormControl('over');

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig) {
	}
}