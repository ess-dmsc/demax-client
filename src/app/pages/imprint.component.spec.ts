import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule} from '../ext/material.module';
import { ImprintComponent } from './imprint.component';


describe('ImprintComponent', () => {
  let component: ImprintComponent;
  let fixture: ComponentFixture<ImprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprintComponent ],
        imports: [MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
