import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadModule } from "ng2-file-upload";
import { SharedModule } from "../../shared/shared.module";

describe('FileUploadComponent', () => {
	let component: FileUploadComponent;
	let fixture: ComponentFixture<FileUploadComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ SharedModule, FileUploadModule ],
			declarations: [ FileUploadComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FileUploadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
