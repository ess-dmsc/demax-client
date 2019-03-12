import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordComponent } from "./password.component";
import { SharedModule } from "../../shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../auth.service";

describe('PasswordComponent', () => {
	let component: PasswordComponent;
	let fixture: ComponentFixture<PasswordComponent>;
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
			declarations: [ PasswordComponent ],
			imports: [ SharedModule, RouterTestingModule ],
			providers: [
				{provide: AuthService, useValue: authServiceStub}
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	/*it('should create', () => {
		expect(component).toBeTruthy();
	});*/
});
