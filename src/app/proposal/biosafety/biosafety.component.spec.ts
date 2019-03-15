import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiosafetyComponent } from './biosafety.component';
import { SharedModule } from "../../shared/shared.module";

describe('BiosafetyComponent', () => {
  let component: BiosafetyComponent;
  let fixture: ComponentFixture<BiosafetyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiosafetyComponent ],
	    imports: [SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiosafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
