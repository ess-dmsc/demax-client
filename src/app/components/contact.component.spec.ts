import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from "../external/material.module";
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
	let component: ContactComponent;
	let fixture: ComponentFixture<ContactComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ContactComponent ],
			imports: [ MaterialModule ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
});