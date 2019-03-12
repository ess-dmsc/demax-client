import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdminComponent } from './user-admin.component';
import { SharedModule } from "../../shared/shared.module";
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from "../../user/auth.service";

describe('UserAdminComponent', () => {
	let component: UserAdminComponent;
	let fixture: ComponentFixture<UserAdminComponent>;
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
			declarations: [ UserAdminComponent ],
			imports: [ SharedModule, RouterTestingModule ],
			providers: [
				{provide: AuthService, useValue: authServiceStub}
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserAdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});


});
