import { TestBed } from '@angular/core/testing';
import { UserAdminService } from './user-admin.service';
import { SharedModule } from "../shared/shared.module";

describe('UserAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({
	  imports: [SharedModule]
  }));

  it('should be created', () => {
    const service: UserAdminService = TestBed.get(UserAdminService);
    expect(service).toBeTruthy();
  });
});
