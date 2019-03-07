import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from "./account/account.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { CookieDialog, PrivacyDialog, RegisterComponent } from "./register/register.component";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { AuthGuardLogin } from "./auth-guard-login.service";
import { AuthGuardAdmin } from "../admin/auth-guard-admin.service";
import { SharedModule } from "../shared/shared.module";
import { PasswordComponent } from './password/password.component';
import { TestregisterComponent } from './testregister/testregister.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		AccountComponent,
		LoginComponent,
		LogoutComponent,
		RegisterComponent,
		CookieDialog,
		PrivacyDialog,
		PasswordComponent,
		TestregisterComponent
	],
	providers: [
		AuthService,
		AuthGuardLogin,
		AuthGuardAdmin,
		UserService,
	],
	entryComponents: [ PrivacyDialog, CookieDialog ],
	exports: [
		AccountComponent,
		LoginComponent,
		LogoutComponent,
		RegisterComponent,
		PasswordComponent,
		TestregisterComponent
	]
})
export class UserModule {
}
