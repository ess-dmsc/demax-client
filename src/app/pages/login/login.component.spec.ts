import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from "./login.component";
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "../../services/user.service";
import { User } from '../../models/user';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let auth: AuthService;
	let authServiceStub: {
		loggedIn: boolean,
		isAdmin: boolean,
		currentUser: any
	};
	let user: User;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ],
			imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule ],
			providers: [
				{provide: FormGroup},
				{provide: FormBuilder},
				{provide: FormControl},
				{provide: AuthService, useValue: authServiceStub}
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
/*
	it('should create', () => {
		expect(component).toBeTruthy();
	});
*/
});