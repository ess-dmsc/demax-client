import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { By } from "@angular/platform-browser";
import { AuthService } from "../../user/auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { APP_CONFIG, APP_DI_CONFIG } from "../../app-config.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('SidebarComponent', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;
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
			declarations: [ SidebarComponent ],
			imports: [ RouterTestingModule ],
			providers: [
				{provide: APP_CONFIG, useValue: APP_DI_CONFIG},
				{provide: AuthService, useValue: authServiceStub}
			],
			schemas: [ NO_ERRORS_SCHEMA ]
		})
		.compileComponents().then(() => {
			fixture = TestBed.createComponent(SidebarComponent);
			component = fixture.componentInstance;
			authService = fixture.debugElement.injector.get(AuthService);
			fixture.detectChanges();
		});
	}));

	it('should create', async () => {
		expect(component).toBeTruthy();
	});

	it('should display the sidebar correctly for normal users', async() => {
		authService.loggedIn = true;
		authService.isAdmin = false;
		fixture.detectChanges();
		const a = fixture.debugElement.queryAll(By.css('a'));
		expect(a.length).toBe(5);
	});

	it('should display the sidebar correctly for admin users', async() => {
		authService.loggedIn = true;
		authService.isAdmin = true;
		fixture.detectChanges();
		const a = fixture.debugElement.queryAll(By.css('a'));
		expect(a.length).toBe(6);
		expect(a[ 5 ].attributes[ 'routerLink' ]).toBe('/admin');
	});

});
