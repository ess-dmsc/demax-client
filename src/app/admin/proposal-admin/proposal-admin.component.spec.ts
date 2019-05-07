import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProposalAdminComponent } from './proposal-admin.component';
import { APP_CONFIG, APP_DI_CONFIG } from "../../app-config.module";
import { SharedModule } from "../../shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserAdminComponent } from "../user-admin/user-admin.component";
import { AuthService } from "../../user/auth.service";

describe('ProposalAdminComponent', () => {
	let component: ProposalAdminComponent;
	let fixture: ComponentFixture<ProposalAdminComponent>;
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
			declarations: [ ProposalAdminComponent ],
			imports: [ SharedModule, RouterTestingModule ],
			providers: [
				{provide: APP_CONFIG, useValue: APP_DI_CONFIG},
				{provide: AuthService, useValue: authServiceStub},
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProposalAdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	/*it('should create', () => {
	expect(component).toBeTruthy();
});*/

});
