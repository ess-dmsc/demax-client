import { TestBed, inject } from '@angular/core/testing';
import { FileAdminService } from "./file-admin.service";
import { SharedModule } from "../shared/shared.module";

describe('FileAdminService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [SharedModule],
			providers: [FileAdminService]
		});
	});

	it('should be created', inject([FileAdminService], (service: FileAdminService) => {
		expect(service).toBeTruthy();
	}));
});
