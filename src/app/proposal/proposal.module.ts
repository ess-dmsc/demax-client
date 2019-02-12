import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalDetailComponent } from "./proposal-detail/proposal-detail.component";
import { ProposalListComponent } from "./proposal-list/proposal-list.component";
import { ProposalService } from "../services/proposal.service";
import { MaterialModule } from "../external/material.module";
import { SharedModule } from "../shared/shared.module";
import { FileUploadComponent } from "../file/file-upload/file-upload.component";

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		SharedModule
	],
	declarations: [
		ProposalDetailComponent,
		ProposalListComponent,
		FileUploadComponent
	],
	providers: [
		ProposalService
	],
	exports: [ ProposalDetailComponent, ProposalListComponent ]

})
export class ProposalModule {
}
