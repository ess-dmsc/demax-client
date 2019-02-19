import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../external/material.module";
import { SharedModule } from "../shared/shared.module";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileListComponent } from "./file-list/file-list.component";
import { FileDetailComponent } from "./file-detail/file-detail.component";
import { FileService } from "./file.service";

import { MessageComponent } from "../shared/message/message.component";
import { ChemicalStructureComponent } from './file-upload/chemical-structure/chemical-structure.component';
import { ChemicalReferenceComponent } from './file-upload/chemical-reference/chemical-reference.component';
import { FileDropDirective, FileSelectDirective } from "ng2-file-upload";
import { FileUploadComponent2 } from "../file-upload/file-upload.component";
import { FileUpload3Component } from '../file-upload3/file-upload3.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		SharedModule
	],
	declarations: [
		FileUploadComponent,
		FileListComponent,
		FileDetailComponent,
		ChemicalStructureComponent,
		ChemicalReferenceComponent,
		FileUploadComponent2,
		FileSelectDirective,
		FileDropDirective,
		FileUpload3Component
	],
	providers: [
		FileService,
		MessageComponent
	],
	exports: [
		FileUploadComponent,
		FileUploadComponent2,
		FileUpload3Component,
		FileDetailComponent,
		FileListComponent,
		ChemicalReferenceComponent,
		ChemicalStructureComponent
	]

})

export class FileModule {
}