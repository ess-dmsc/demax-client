import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ProposalComponent } from './proposal.component';
import { MaterialModule } from "../external/material.module";

describe('ProposalComponent', () => {
	let component: ProposalComponent;
	let fixture: ComponentFixture<ProposalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProposalComponent ],
			imports: [ FormsModule, ReactiveFormsModule, MaterialModule ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProposalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	/*it('should create', () => {
		expect(component).toBeTruthy();
	});*/
});
