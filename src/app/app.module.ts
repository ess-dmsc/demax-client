import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppConfigModule } from './app-config.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './ext/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ImprintComponent } from './pages/imprint.component';
import { HomeComponent } from './pages/home.component';
import { ContactComponent } from './pages/contact.component';
import { NotFoundComponent } from './pages/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProposalService } from './proposal.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuardLogin } from "./services/auth-guard-login.service";
import { AuthGuardAdmin } from "./services/auth-guard-admin.service";
import { LogoutComponent } from "./components/logout/logout.component";
import { AdminComponent } from './pages/admin.component';
import { UserComponent } from "./pages/user.component";
import { LoadingComponent} from "./components/loading/loading.component";
import { TestingComponent } from "./pages/testing.component";
import { MessageService }       from './services/message.service';
import { HttpErrorHandler }     from './services/http-error-handler.service';

export const tokenGetter = () => {
	return localStorage.getItem('token')
};

@NgModule({
	declarations: [
		AppComponent,
		AdminComponent,
		ImprintComponent,
		HomeComponent,
		ContactComponent,
		NotFoundComponent,
		RegisterComponent,
		LoadingComponent,
		LoginComponent,
		LogoutComponent,
		ProposalsComponent,
		TestingComponent,
		UserComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CommonModule,
		AppConfigModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,

		HttpModule,
		MaterialModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: [ 'localhost:4200', 'localhost:8080' ],
			}
		})
	],
	providers: [
		AuthService,
		AuthGuardAdmin,
		AuthGuardLogin,
		HttpErrorHandler,
		MessageService,
		UserService,
		ProposalService
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {
}
