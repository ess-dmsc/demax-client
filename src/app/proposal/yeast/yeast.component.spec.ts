import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeastComponent } from './yeast.component';
import { SharedModule } from "../../shared/shared.module";

describe('YeastComponent', () => {
	let component: YeastComponent;
	let fixture: ComponentFixture<YeastComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ YeastComponent ],
			imports: [ SharedModule ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(YeastComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});


});
