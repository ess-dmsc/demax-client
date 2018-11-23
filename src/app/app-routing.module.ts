import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found.component';
import { ImprintComponent } from './pages/imprint.component';
import { HomeComponent } from './pages/home.component';
import { ProposalsComponent } from "./proposals/proposals.component";
import { AuthGuardLogin } from "./services/auth-guard-login.service";
import { AuthGuardAdmin } from "./services/auth-guard-admin.service";
import { LogoutComponent } from "./components/logout/logout.component";
import { AdminComponent } from "./pages/admin.component";
import { UserComponent } from "./pages/user.component";

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'admin', component: AdminComponent, canActivate: [ AuthGuardAdmin ]},
	{path: 'contact', component: ContactComponent},
	{path: 'home', component: HomeComponent},
	{path: 'imprint', component: ImprintComponent},
	{path: 'login', component: LoginComponent},
	{path: 'logout', component: LogoutComponent},
	{path: 'notfound', component: NotFoundComponent},
	{path: 'proposals', component: ProposalsComponent, canActivate: [ AuthGuardLogin ]},
	{path: 'register', component: RegisterComponent},
	{path: 'user', component: UserComponent, canActivate: [ AuthGuardLogin ]},
	{path: '**', redirectTo: '/notfound'}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {
}