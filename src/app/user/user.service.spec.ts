import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

describe('UserService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [ RouterTestingModule ],
		providers: [
			{provide: HttpClient}
		]
	}));

	it('should be created', () => {
		const service: UserService = TestBed.get(UserService);
		expect(service).toBeTruthy();
	});
});
