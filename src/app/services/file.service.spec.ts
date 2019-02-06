import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClient } from '@angular/common/http';

describe('FileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient}
    ]
  }));

  it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });
});
