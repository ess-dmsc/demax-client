import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './external/material.module';
import { APP_CONFIG, APP_DI_CONFIG } from "./app-config.module";
import { AuthService } from "./services/auth.service";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('AppComponent', () => {
	let auth: AuthService;
	let authServiceStub: {
		loggedIn: boolean,
		isAdmin: boolean,
		currentUser: any
	};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				MaterialModule,
				FormsModule,
				ReactiveFormsModule
			],
			declarations: [
				AppComponent,
				LoginComponent,
				RegisterComponent
			],
			providers: [
				{provide: APP_CONFIG, useValue: APP_DI_CONFIG},
				{provide: AuthService, useValue: authServiceStub}
			]
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});
});
