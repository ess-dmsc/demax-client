import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalDetailComponent } from "./proposal-detail/proposal-detail.component";
import { ProposalListComponent } from "./proposal-list/proposal-list.component";
import { ProposalService } from "./proposal.service";
import { MaterialModule } from "../external/material.module";
import { SharedModule } from "../shared/shared.module";
import { FileModule } from "../file/file.module";
import { CrystallizationComponent } from './crystallization/crystallization.component';
import { ProteinComponent } from './protein/protein.component';
import { BiosafetyComponent } from './biosafety/biosafety.component';
import { YeastComponent } from './yeast/yeast.component';
import { BiomassComponent } from "./biomass/biomass.component";
import { ChemicalComponent } from './chemical/chemical.component';
import { ProposalReviewComponent } from './proposal-review/proposal-review.component';
import { ProposalCommentComponent } from './proposal-comment/proposal-comment.component';

@NgModule({
	imports: [
		CommonModule,
		FileModule,
		MaterialModule,
		SharedModule
	],
	declarations: [
		ProposalDetailComponent,
		ProposalListComponent,
		BiomassComponent,
		BiosafetyComponent,
		CrystallizationComponent,
		ProteinComponent,
		YeastComponent,
		ChemicalComponent,
		ProposalReviewComponent,
		ProposalCommentComponent
	],
	providers: [
		ProposalService
	],
	exports: [
		BiomassComponent,
		BiosafetyComponent,
		CrystallizationComponent,
		ChemicalComponent,
		YeastComponent,
		ProteinComponent,
		ProposalDetailComponent,
		ProposalListComponent,
		ProposalReviewComponent,
		ProposalCommentComponent
	]

})
export class ProposalModule {
}
