import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../external/material.module";
import { SharedModule } from "../shared/shared.module";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileListComponent } from "./file-list/file-list.component";
import { FileService } from "./file.service";
import { FileUploadModule } from "ng2-file-upload";
import { MessageComponent } from "../shared/message/message.component";
import { FileUploadSelectComponent } from './file-upload-select/file-upload-select.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		SharedModule,
		FileUploadModule
	],
	declarations: [
		FileUploadComponent,
		FileListComponent,
		FileUploadSelectComponent
	],
	providers: [
		FileService,
		MessageComponent
	],
	exports: [
		FileUploadComponent,
		FileUploadSelectComponent,
		FileListComponent
	]

})

export class FileModule {
}