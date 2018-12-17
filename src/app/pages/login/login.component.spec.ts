import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule} from '../../ext/material.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ],
			imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule],
			providers: [AuthService]
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
	});*/
});
