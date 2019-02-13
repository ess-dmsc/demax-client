import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalDetailComponent } from "./proposal-detail/proposal-detail.component";
import { ProposalListComponent } from "./proposal-list/proposal-list.component";
import { ProposalService } from "./proposal.service";
import { MaterialModule } from "../external/material.module";
import { SharedModule } from "../shared/shared.module";
import { FileModule } from "../file/file.module";

@NgModule({
	imports: [
		CommonModule,
		FileModule,
		MaterialModule,
		SharedModule
	],
	declarations: [
		ProposalDetailComponent,
		ProposalListComponent
	],
	providers: [
		ProposalService
	],
	exports: [ ProposalDetailComponent, ProposalListComponent ]

})
export class ProposalModule {
}
