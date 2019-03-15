import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalComponent } from './chemical.component';
import { SharedModule } from "../../shared/shared.module";
import { FileModule } from "../../file/file.module";

describe('ChemicalComponent', () => {
  let component: ChemicalComponent;
  let fixture: ComponentFixture<ChemicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemicalComponent ],
	    imports: [SharedModule, FileModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
