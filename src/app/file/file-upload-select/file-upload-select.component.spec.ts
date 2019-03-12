import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadSelectComponent } from './file-upload-select.component';
import { SharedModule } from "../../shared/shared.module";
import { FileUploadModule } from "ng2-file-upload";

describe('FileUploadSelectComponent', () => {
	let component: FileUploadSelectComponent;
	let fixture: ComponentFixture<FileUploadSelectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FileUploadSelectComponent ],
			imports: [ SharedModule, FileUploadModule ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FileUploadSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
