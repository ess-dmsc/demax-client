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

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'account', component: AccountComponent},
    {path: 'admin', component: AdminComponent, canActivate: [ AuthGuardAdmin ]},
    {path: 'contact', component: ContactComponent},
    {path: 'home', component: HomeComponent},
    {path: 'imprint', component: ImprintComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterComponent},
	{path: 'proposals', component: ProposalListComponent},
	{path: 'proposals/:proposalId', component: ProposalDetailComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {
}