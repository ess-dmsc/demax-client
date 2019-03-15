import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrystallizationComponent } from './crystallization.component';
import { SharedModule } from "../../shared/shared.module";
import { FileModule } from "../../file/file.module";

describe('CrystallizationComponent', () => {
  let component: CrystallizationComponent;
  let fixture: ComponentFixture<CrystallizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrystallizationComponent ],
	    imports: [SharedModule, FileModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrystallizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
