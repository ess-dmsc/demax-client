import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from "../external/material.module";
import { GuidelinesComponent } from './guidelines.component';
import { APP_CONFIG, APP_DI_CONFIG } from "../app-config.module";

describe('GuidelinesComponent', () => {
	let component: GuidelinesComponent;
	let fixture: ComponentFixture<GuidelinesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ GuidelinesComponent ],
			imports: [ MaterialModule ],
			providers: [
				{provide: APP_CONFIG, useValue: APP_DI_CONFIG}
				]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GuidelinesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});