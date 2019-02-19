import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUpload3Component } from './file-upload3.component';

describe('FileUpload3Component', () => {
  let component: FileUpload3Component;
  let fixture: ComponentFixture<FileUpload3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUpload3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUpload3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
