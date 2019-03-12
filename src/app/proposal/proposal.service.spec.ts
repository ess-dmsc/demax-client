import { TestBed } from '@angular/core/testing';

import { ProposalService } from './proposal.service';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";

describe('ProposalService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [ RouterTestingModule, JwtModule ],
		providers: [
			{provide: HttpClient},
			{provide: JwtHelperService}
		]
	}));

	it('should be created', () => {
		const service: ProposalService = TestBed.get(ProposalService);
		expect(service).toBeTruthy();
	});
});
