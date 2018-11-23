import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { AuthService } from "../../services/auth.service";

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let toast: ToastComponent;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	/*it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the string "Login" in h4', () => {
	  const el = fixture.debugElement.query(By.css('h4')).nativeElement;
	  expect(el.textContent).toContain('Login');
	});*/
});