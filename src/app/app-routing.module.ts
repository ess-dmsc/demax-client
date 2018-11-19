import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ImprintComponent } from './imprint/imprint.component';
import { HomeComponent } from './home/home.component';
import { ProposalListComponent } from './proposal-list/proposal-list.component';


const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'contact', component: ContactComponent},
	{path: 'home', component: HomeComponent},
	{path: 'imprint', component: ImprintComponent},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'proposals', component: ProposalListComponent},
	{path: '**', component: NotFoundComponent},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {
}