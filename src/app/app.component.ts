import { Component, OnInit, Inject, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AppConfig } from "./app-config.module";
import { APP_CONFIG } from "./app-config.module";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "./services/auth.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewChecked {
	title = 'demax-client';
	opened: boolean;
	mode = new FormControl('over');
	options: FormGroup;

	constructor(
		fb: FormBuilder,
		public auth: AuthService,
		private changeDetector: ChangeDetectorRef,
		@Inject(APP_CONFIG) private appConfig: AppConfig

	) {
	this.options = fb.group({
		bottom: 0,
		fixed: false,
		top: 0
	});
	}

	ngAfterViewChecked() {
		this.changeDetector.detectChanges();
	}


}
