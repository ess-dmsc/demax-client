import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from "./login.component";
import { SharedModule } from "../../shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../auth.service";

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let authServiceStub: {
		loggedIn: boolean;
		isAdmin: boolean;
		currentUser: any;
	};
	beforeEach(async(() => {
		authServiceStub = {
			loggedIn: false,
			isAdmin: false,
			currentUser: {email: 'test@test.com'}
		};
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ],
			imports: [ SharedModule, RouterTestingModule ],
			providers: [
				{provide: AuthService, useValue: authServiceStub}
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
