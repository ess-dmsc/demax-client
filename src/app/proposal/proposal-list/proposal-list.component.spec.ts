import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { APP_CONFIG, APP_DI_CONFIG } from "../../app-config.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { UserModule } from "../../user/user.module";
import { SharedModule } from "../../shared/shared.module";
import { ProposalListComponent } from "./proposal-list.component";
import { AuthService } from "../../user/auth.service";

describe("ProposalListComponent", () => {
	let component: ProposalListComponent;
	let fixture: ComponentFixture<ProposalListComponent>;
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
			currentUser: {email: 'test@test.com'}
		};
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				SharedModule,
				UserModule
			],
			declarations: [ ProposalListComponent ],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
			providers: [
				{provide: APP_CONFIG, useValue: APP_DI_CONFIG},
				{provide: AuthService, useValue: authServiceStub}
			]
		}).compileComponents().then(() => {
			fixture = TestBed.createComponent(ProposalListComponent);
			component = fixture.componentInstance;
			authService = fixture.debugElement.injector.get(AuthService);
			fixture.detectChanges();
		});
	}));

	it("should create the component", async () => {
		expect(component).toBeTruthy();
	});

});
