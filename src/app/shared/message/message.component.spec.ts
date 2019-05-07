import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { MaterialModule } from "../../external/material.module";

describe('MessageComponent', () => {
	let component: MessageComponent;
	let fixture: ComponentFixture<MessageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MessageComponent ],
			imports: [
				MaterialModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

});
