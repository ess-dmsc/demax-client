import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { AuthGuardAdmin } from "./auth-guard-admin.service";
import { ProposalAdminComponent } from './proposal-admin/proposal-admin.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { FileAdminComponent } from "./file-admin/file-admin.component";
import { FileAdminService } from "./file-admin/file-admin.service";
import { UserAdminService } from "./user-admin/user-admin.service";
import { FileModule } from "../file/file.module";

@NgModule({
	imports: [
		CommonModule,
		FileModule,
		SharedModule
	],
	declarations: [
		FileAdminComponent,
		ProposalAdminComponent,
		UserAdminComponent
	],
	providers: [
		AuthGuardAdmin,
		FileAdminService,
		UserAdminService
	],
	exports: [
		FileAdminComponent,
		ProposalAdminComponent,
		UserAdminComponent
	]
})
export class AdminModule {
}
