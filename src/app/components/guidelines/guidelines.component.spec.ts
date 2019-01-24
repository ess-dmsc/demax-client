import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from "../../external/material.module";
import { GuidelinesComponent } from './guidelines.component';

describe('GuidelinesComponent', () => {
	let component: GuidelinesComponent;
	let fixture: ComponentFixture<GuidelinesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ GuidelinesComponent ],
			imports: [ MaterialModule ]
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