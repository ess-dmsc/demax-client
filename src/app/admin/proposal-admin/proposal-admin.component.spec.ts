import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalAdminComponent } from './proposal-admin.component';
import { MaterialModule } from "../../external/material.module";

describe('ProposalAdminComponent', () => {
	let component: ProposalAdminComponent;
	let fixture: ComponentFixture<ProposalAdminComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ MaterialModule ],
			declarations: [ ProposalAdminComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProposalAdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
/*
	it('should create', () => {
		expect(component).toBeTruthy();
	});*/
});
