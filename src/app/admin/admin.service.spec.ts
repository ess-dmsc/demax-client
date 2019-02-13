import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { HttpClientModule } from "@angular/common/http";

describe('AdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({
	  imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
});
