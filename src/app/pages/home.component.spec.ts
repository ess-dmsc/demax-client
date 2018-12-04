import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../ext/material.module';
import { HomeComponent } from './home.component';
import { AuthService } from "../services/auth.service";
import { APP_CONFIG, APP_DI_CONFIG } from "../app-config.module";

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
	let auth: AuthService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ HomeComponent ],
			imports: [ MaterialModule ],
			providers: [
				{provide: APP_CONFIG, useValue: APP_DI_CONFIG},
				{provide: AuthService},
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});
