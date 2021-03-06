import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { APP_CONFIG, APP_DI_CONFIG } from "./app-config.module";
import { AuthService } from "./user/auth.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HAMMER_LOADER } from "@angular/platform-browser";
import { UserModule } from "./user/user.module";
import { MaterialModule } from "./external/material.module";

describe("AppComponent", () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let authService: AuthService;
	let authServiceStub: {
		loggedIn: boolean;
		isAdmin: boolean;
		currentUser: any;
	};
	beforeEach(async(() => {
		authServiceStub = {
			loggedIn: false,
			isAdmin: false,
			currentUser: {email: 'firstname.lastname@email.com'}
		};
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				MaterialModule,
				UserModule
			],
			declarations: [ AppComponent ],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
			providers: [
				{provide: APP_CONFIG, useValue: APP_DI_CONFIG},
				{provide: AuthService, useValue: authServiceStub},
				{
					provide: HAMMER_LOADER,
					useValue: () => new Promise(() => {
					})
				}
			]
		}).compileComponents().then(() => {
			fixture = TestBed.createComponent(AppComponent);
			component = fixture.componentInstance;
			authService = fixture.debugElement.injector.get(AuthService);
			fixture.detectChanges();
		});
	}));
});
