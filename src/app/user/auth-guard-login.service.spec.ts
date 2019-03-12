import { TestBed } from '@angular/core/testing';

import { AuthGuardLogin } from './auth-guard-login.service';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";

describe('AuthGuardLogin', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [ RouterTestingModule, JwtModule ],
		providers: [
			{provide: HttpClient},
			{provide: JwtHelperService}
		]
	}));

	it('should be created', () => {
		const service: AuthGuardLogin = TestBed.get(AuthGuardLogin);
		expect(service).toBeTruthy();
	});
});
