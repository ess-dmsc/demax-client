import { TestBed } from '@angular/core/testing';

import { AuthGuardAdmin } from './auth-guard-admin.service';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";

describe('AuthGuardAdmin', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [ RouterTestingModule, JwtModule ],
		providers: [
			{provide: HttpClient},
			{provide: JwtHelperService}
		]
	}));

	it('should be created', () => {
		const service: AuthGuardAdmin = TestBed.get(AuthGuardAdmin);
		expect(service).toBeTruthy();
	});
});
