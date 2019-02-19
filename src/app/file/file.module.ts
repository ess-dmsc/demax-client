import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../external/material.module";
import { SharedModule } from "../shared/shared.module";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileListComponent } from "./file-list/file-list.component";
import { FileDetailComponent } from "./file-detail/file-detail.component";
import { FileService } from "./file.service";
import {FileUploadModule} from "ng2-file-upload";
import { MessageComponent } from "../shared/message/message.component";
import { FileDropDirective, FileSelectDirective } from "ng2-file-upload";
import { FileUploadComponent2 } from "./file-upload2/file-upload.component";

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
		FileDetailComponent,
		FileUploadComponent2
	],
	providers: [
		FileService,
		MessageComponent
	],
	exports: [
		FileUploadComponent,
		FileUploadComponent2,
		FileDetailComponent,
		FileListComponent
	]

})

export class FileModule {
}