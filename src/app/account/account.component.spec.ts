import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { MaterialModule } from "../external/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";

describe('AccountComponent', () => {
	let component: AccountComponent;
	let fixture: ComponentFixture<AccountComponent>;

	beforeEach(async(() => {

		TestBed.configureTestingModule({
			declarations: [ AccountComponent ],
			imports: [ MaterialModule, FormsModule, ReactiveFormsModule ],
			providers: [ UserService, AuthService ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

});
