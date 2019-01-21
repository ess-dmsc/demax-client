import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found.component';
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

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'admin', component: AdminComponent, canActivate: [ AuthGuardAdmin ]},
	{path: 'contact', component: ContactComponent},
	{path: 'guidelines', component: GuidelinesComponent},
	{path: 'home', component: HomeComponent},
	{path: 'imprint', component: ImprintComponent},
	{path: 'login', component: LoginComponent},
	{path: 'logout', component: LogoutComponent},
	{path: 'notfound', component: NotFoundComponent},
	{path: 'proposals', component: ProposalsComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'test', component: TestingComponent},
	{path: 'user', component: UserComponent},
	{path: 'proposal', component: ProposalComponent},
	{path: '**', redirectTo: '/notfound'},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {
}