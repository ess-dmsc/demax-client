import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";

describe('AuthService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [ RouterTestingModule, JwtModule ],
		providers: [
			{provide: HttpClient},
			{provide: JwtHelperService}
		]
	}));

	it('should be created', () => {
		const service: AuthService = TestBed.get(AuthService);
		expect(service).toBeTruthy();
	});
});
