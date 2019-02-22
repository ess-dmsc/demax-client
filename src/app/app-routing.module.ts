import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './user/register/register.component';
import { ImprintComponent } from './imprint/imprint.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardAdmin } from "./admin/auth-guard-admin.service";
import { LogoutComponent } from "./user/logout/logout.component";
import { AdminComponent } from "./admin/admin/admin.component";
import { AccountComponent } from "./user/account/account.component";
import { ProposalDetailComponent } from "./proposal/proposal-detail/proposal-detail.component";
import { ProposalListComponent } from "./proposal/proposal-list/proposal-list.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { CookiePolicyComponent } from "./cookie-policy/cookie-policy.component";
import { AuthGuardLogin } from "./user/auth-guard-login.service";
import { PasswordComponent } from "./user/password/password.component";

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'account', component: AccountComponent, canActivate: [ AuthGuardLogin ]},
	{path: 'admin', component: AdminComponent, canActivate: [ AuthGuardAdmin ]},
	{path: 'contact', component: ContactComponent},
	{path: 'home', component: HomeComponent},
	{path: 'imprint', component: ImprintComponent},
	{path: 'login', component: LoginComponent},
	{path: 'logout', component: LogoutComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'cookie-policy', component: CookiePolicyComponent},
	{path: 'change-password', component: PasswordComponent},
	{path: 'privacy-policy', component: PrivacyPolicyComponent},
	{path: 'proposals', component: ProposalListComponent, canActivate: [ AuthGuardLogin ]},
	{path: 'proposals/:proposalId', component: ProposalDetailComponent, canActivate: [ AuthGuardLogin ]}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {
}