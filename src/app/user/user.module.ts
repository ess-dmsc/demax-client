import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from "./account/account.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegisterComponent } from "./register/register.component";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { AdminComponent } from "./admin/admin.component";
import { AuthGuardLogin } from "../services/auth-guard-login.service";
import { AuthGuardAdmin } from "../services/auth-guard-admin.service";
import { SharedModule } from "../shared/shared.module";
import {FileAdminComponent} from "../file/file-admin/file-admin.component";

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		AccountComponent,
		AdminComponent,
		FileAdminComponent,
		LoginComponent,
		LogoutComponent,
		RegisterComponent
	],
	providers: [
		AuthService,
		AuthGuardLogin,
		AuthGuardAdmin,
		UserService,
	],
	exports: [
		AccountComponent,
		AdminComponent,
		FileAdminComponent,
		LoginComponent,
		LogoutComponent,
		RegisterComponent
	]
})
export class UserModule {
}
