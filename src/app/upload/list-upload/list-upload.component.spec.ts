import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUploadComponent } from './list-upload.component';
import { UploadFileService } from "../upload-file.service";

describe('ListUploadComponent', () => {
  let component: ListUploadComponent;
  let fixture: ComponentFixture<ListUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUploadComponent ],
	    providers: [UploadFileService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
