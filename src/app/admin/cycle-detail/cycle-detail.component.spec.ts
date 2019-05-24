import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleDetailComponent } from './cycle-detail.component';

describe('CycleDetailComponent', () => {
  let component: CycleDetailComponent;
  let fixture: ComponentFixture<CycleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
