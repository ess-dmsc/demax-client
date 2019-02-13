import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { AdminComponent } from "./admin/admin.component";
import { AuthGuardAdmin } from "./auth-guard-admin.service";
import { ProposalAdminComponent } from './proposal-admin/proposal-admin.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { FileAdminComponent } from "./file-admin/file-admin.component";
import { AdminService } from "./admin.service";
import { FileAdminService } from "./file-admin.service";
import { ProposalAdminService } from "./proposal-admin.service";
import { UserAdminService } from "./user-admin.service";
import { FileModule } from "../file/file.module";

@NgModule({
	imports: [
		CommonModule,
		FileModule,
		SharedModule
	],
  declarations: [
  	AdminComponent,
    FileAdminComponent,
  	ProposalAdminComponent,
  	UserAdminComponent
  ],
	providers: [
		AuthGuardAdmin,
		AdminService,
		FileAdminService,
		ProposalAdminService,
		UserAdminService
	],
	exports: [
		AdminComponent
	]
})
export class AdminModule { }
