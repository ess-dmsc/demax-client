import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../ext/material.module';
import { HomeComponent } from './home.component';
import { AuthService } from "../services/auth.service";

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
	let auth: AuthService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ HomeComponent ],
			imports: [ MaterialModule ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
/*
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	*/
});
