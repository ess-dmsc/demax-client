import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from "../../external/material.module";
import { UserService } from '../user.service';
import { RegisterComponent } from './register.component';
import { APP_CONFIG, APP_DI_CONFIG } from "../../app-config.module";
import { AuthService } from "../auth.service";
import { ProposalService } from "../../proposal/proposal.service";
import { HttpClient } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RegisterComponent ],
			imports: [ MaterialModule, FormsModule, ReactiveFormsModule, RouterTestingModule ],
			providers: [
				{provide: APP_CONFIG, useValue: APP_DI_CONFIG},
				{provide: AuthService},
				{provide: ProposalService},
				{provide: HttpClient},
				{provide: FormBuilder},
				{provide: FormGroup}
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RegisterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	/*
		it('should create', () => {
			expect(component).toBeTruthy();
		});
	*/
});