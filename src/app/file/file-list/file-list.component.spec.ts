import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileListComponent } from './file-list.component';
import { SharedModule } from "../../shared/shared.module";

describe('FileListComponent', () => {
  let component: FileListComponent;
  let fixture: ComponentFixture<FileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	    imports: [SharedModule],
      declarations: [ FileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
