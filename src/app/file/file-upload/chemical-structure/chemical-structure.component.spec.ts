import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalStructureComponent } from './chemical-structure.component';

describe('ChemicalStructureComponent', () => {
  let component: ChemicalStructureComponent;
  let fixture: ComponentFixture<ChemicalStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemicalStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
