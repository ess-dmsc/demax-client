import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../external/material.module";
import { SharedModule } from "../shared/shared.module";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileListComponent } from "./file-list/file-list.component";
import { FileDetailComponent } from "./file-detail/file-detail.component";
import { FileService } from "./file.service";
import { MessageComponent } from "../shared/message/message.component";

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		SharedModule
	],
	declarations: [
		FileUploadComponent,
		FileListComponent,
		FileDetailComponent
	],
	providers: [
		FileService,
		MessageComponent
	],
	exports: [ FileUploadComponent, FileDetailComponent, FileListComponent ]

})

export class FileModule {
}