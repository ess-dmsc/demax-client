import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { SharedModule } from "../../shared/shared.module";
import { AuthService } from "../../user/auth.service";
import { RouterTestingModule } from "@angular/router/testing";

describe('AdminComponent', () => {
	let component: AdminComponent;
	let fixture: ComponentFixture<AdminComponent>;
	let authServiceStub: {
		loggedIn: boolean;
		isAdmin: boolean;
		currentUser: any;
	};
	beforeEach(async(() => {
		authServiceStub = {
			loggedIn: false,
			isAdmin: true,
			currentUser: {email: 'test@test.com'}
		};
		TestBed.configureTestingModule({
			declarations: [ AdminComponent ],
			imports: [ SharedModule, RouterTestingModule ],
			providers: [
				{provide: AuthService, useValue: authServiceStub}
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});
