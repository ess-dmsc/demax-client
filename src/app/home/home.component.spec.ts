import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HomeComponent } from './home.component';
import { MaterialModule } from "../external/material.module";
import { APP_CONFIG, APP_DI_CONFIG } from '../app-config.module';
import { ProposalModule } from "../proposal/proposal.module";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [MaterialModule],
      providers: [{provide: APP_CONFIG, useValue: APP_DI_CONFIG}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
