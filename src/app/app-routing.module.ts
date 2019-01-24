import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { ImprintComponent } from './components/imprint.component';
import { HomeComponent } from './components/home.component';
import { ProposalsComponent } from "./proposals/proposals.component";
import { AuthGuardLogin } from "./services/auth-guard-login.service";
import { AuthGuardAdmin } from "./services/auth-guard-admin.service";
import { LogoutComponent } from "./components/logout/logout.component";
import { AdminComponent } from "./components/admin.component";
import { UserComponent } from "./components/user.component";
import { TestingComponent } from "./components/testing.component";
import { ProposalComponent } from "./proposal/proposal.component";
import { GuidelinesComponent } from "./components/guidelines/guidelines.component";
import { EditProposalComponent } from "./edit-proposal/edit-proposal.component";

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'admin', component: AdminComponent, canActivate: [ AuthGuardAdmin ]},
	{path: 'contact', component: ContactComponent},
	{path: 'guidelines', component: GuidelinesComponent},
	{path: 'home', component: HomeComponent},
	{path: 'imprint', component: ImprintComponent},
	{path: 'login', component: LoginComponent},
	{path: 'logout', component: LogoutComponent},
	{path: 'proposals', component: ProposalsComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'test', component: TestingComponent},
	{path: 'user', component: UserComponent},
	{path: 'proposal/:proposalId', component: EditProposalComponent},
	{path: 'proposal', component: ProposalComponent},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {
}