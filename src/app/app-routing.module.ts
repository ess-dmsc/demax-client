import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './pages/contact.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './pages/not-found.component';
import { ImprintComponent } from './pages/imprint.component';
import { HomeComponent } from './pages/home.component';
import { ProposalsComponent } from "./proposals/proposals.component";


const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'contact', component: ContactComponent},
	{path: 'home', component: HomeComponent},
	{path: 'imprint', component: ImprintComponent},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'proposals', component: ProposalsComponent},
	{path: '**', component: NotFoundComponent},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {
}