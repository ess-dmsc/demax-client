import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinComponent } from './protein.component';
import { SharedModule } from "../../shared/shared.module";

describe('ProteinComponent', () => {
  let component: ProteinComponent;
  let fixture: ComponentFixture<ProteinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteinComponent ],
	    imports: [SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
