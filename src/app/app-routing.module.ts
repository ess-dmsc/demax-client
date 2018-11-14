import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent} from './pages/contact/contact.component';
import { RegisterComponent} from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProposalsComponent } from './pages/proposals/proposals.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'contact', component: ContactComponent},
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