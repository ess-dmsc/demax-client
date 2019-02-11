import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrystallizationComponent } from './crystallization.component';

describe('CrystallizationComponent', () => {
  let component: CrystallizationComponent;
  let fixture: ComponentFixture<CrystallizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrystallizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrystallizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 /* it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
