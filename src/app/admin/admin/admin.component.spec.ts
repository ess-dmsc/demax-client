import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APP_CONFIG, APP_DI_CONFIG } from '../../app-config.module';
import { SharedModule } from "../../shared/shared.module";

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [SharedModule],
      providers: [
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        { provide: HttpClient }, { provide: Router }, { provide: JwtHelperService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});