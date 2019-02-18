import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAdminComponent } from './file-admin.component';
import { MaterialModule } from "../../external/material.module";

describe('FileAdminComponent', () => {
	let component: FileAdminComponent;
	let fixture: ComponentFixture<FileAdminComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ MaterialModule ],
			declarations: [ FileAdminComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FileAdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	/*
		it('should create', () => {
			expect(component).toBeTruthy();
		});*/
});
