import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { By } from "@angular/platform-browser";
import { AuthService } from "../../user/auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../../external/material.module";
import { APP_CONFIG, APP_DI_CONFIG } from "../../app-config.module";
import { MessageComponent } from "../message/message.component";
import { UserModule } from "../../user/user.module";

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
				{provide: AuthService, useValue: authServiceStub},
				MessageComponent
			]
		})
		.compileComponents().then(() => {
			fixture = TestBed.createComponent(SidebarComponent);
			component = fixture.componentInstance;
			authService = fixture.debugElement.injector.get(AuthService);
			fixture.detectChanges();
		});
	}));
/*
	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the sidebar correctly for admin users', async() => {
		authService.loggedIn = true;
		authService.isAdmin = true;
		fixture.detectChanges();
		const a = fixture.debugElement.queryAll(By.css('a'));
		expect(a.length).toBe(5);
		expect(a[ 4 ].nativeElement.textContent).toContain('Home');
		expect(a[ 4 ].attributes[ 'routerLink' ]).toBe('/home');
		expect(a[ 9 ].nativeElement.textContent).toContain('Admin');
		expect(a[ 9 ].attributes[ 'routerLink' ]).toBe('/admin');
	});

	it('should display the sidebar correctly for normal users', async() => {
		authService.loggedIn = true;
		authService.isAdmin = false;
		fixture.detectChanges();
		const a = fixture.debugElement.queryAll(By.css('a'));
		expect(a.length).toBe(5);
		expect(a[ 4 ].nativeElement.textContent).toContain('Contact');
		expect(a[ 4 ].attributes[ 'routerLink' ]).toBe('/contact');
		expect(a[ 9 ].nativeElement.textContent).toContain('Privacy');
		expect(a[ 9 ].attributes[ 'routerLink' ]).toBe('/privacy-policy');
	});
	*/
});
