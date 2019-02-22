import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordComponent } from './password.component';
import { SharedModule } from "../../shared/shared.module";
import { MaterialModule } from "../../external/material.module";
import { UserService } from "../user.service";
import { AuthService } from "../auth.service";

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordComponent ],
	    imports: [SharedModule, MaterialModule],
	    providers: [ UserService, AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  console.log('test')

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
