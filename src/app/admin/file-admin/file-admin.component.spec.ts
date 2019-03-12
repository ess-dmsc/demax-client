import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileAdminComponent } from './file-admin.component';
import { SharedModule } from "../../shared/shared.module";
import { APP_CONFIG, APP_DI_CONFIG } from "../../app-config.module";
import { RouterTestingModule } from "@angular/router/testing";

describe('FileAdminComponent', () => {
	let component: FileAdminComponent;
	let fixture: ComponentFixture<FileAdminComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ RouterTestingModule, SharedModule ],
			declarations: [ FileAdminComponent ],
			providers: [
				{provide: APP_CONFIG, useValue: APP_DI_CONFIG}
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FileAdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

});
