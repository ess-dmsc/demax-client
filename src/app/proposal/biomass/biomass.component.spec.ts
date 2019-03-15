import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomassComponent } from './biomass.component';
import { SharedModule } from "../../shared/shared.module";
import { FileModule } from "../../file/file.module";
import { FormControl, FormGroup } from "@angular/forms";

describe('BiomassComponent', () => {
	let component: BiomassComponent;
	let fixture: ComponentFixture<BiomassComponent>;
	let formGroup: FormGroup;

	beforeEach(async(() => {
		this.formGroup = new FormGroup({
			value: new FormControl('')
		});
		TestBed.configureTestingModule({
			declarations: [ BiomassComponent ],
			imports: [ SharedModule, FileModule ],
			providers: []
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BiomassComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

});
