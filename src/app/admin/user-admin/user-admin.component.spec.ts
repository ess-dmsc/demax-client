import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminComponent } from './user-admin.component';
import { UserAdminService } from "./user-admin.service";

describe('UserAdminComponent', () => {
  let component: UserAdminComponent;
  let fixture: ComponentFixture<UserAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminComponent ],
	    providers: [UserAdminService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	/*
	   it('should create', () => {
		   expect(component).toBeTruthy();
	   });*/
});
