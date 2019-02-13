import { TestBed } from '@angular/core/testing';

import { ProposalAdminService } from './proposal-admin.service';
import { SharedModule } from "../shared/shared.module";

describe('ProposalAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({
	  imports: [SharedModule]
  }));

  it('should be created', () => {
    const service: ProposalAdminService = TestBed.get(ProposalAdminService);
    expect(service).toBeTruthy();
  });
});
