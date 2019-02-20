import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent2 } from './file-upload.component';
import { MaterialModule } from "../../external/material.module";
import { FileUploadModule } from "ng2-file-upload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('FileUploadComponent2', () => {
  let component: FileUploadComponent2;
  let fixture: ComponentFixture<FileUploadComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadComponent2 ],
	    imports: [ FileUploadModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
