import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {MaterialModule} from "../ext/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UserComponent ],
			imports:[MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule],
			providers: [UserService, AuthService]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
/*
	it('should create', () => {
		expect(component).toBeTruthy();
	});*/
});