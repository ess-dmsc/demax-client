import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalReferenceComponent } from './chemical-reference.component';

describe('ChemicalReferenceComponent', () => {
  let component: ChemicalReferenceComponent;
  let fixture: ComponentFixture<ChemicalReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemicalReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
