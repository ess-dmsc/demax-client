import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from "../auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "../../shared/shared.module";

describe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;
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
			declarations: [ RegisterComponent ],
			imports: [ SharedModule, RouterTestingModule ],
			providers: [
				{provide: AuthService, useValue: authServiceStub}
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RegisterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});