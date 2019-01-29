import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppConfigModule } from './app-config.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './external/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ImprintComponent } from './components/imprint.component';
import { HomeComponent } from './components/home.component';
import { ContactComponent } from './components/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProposalService } from './services/proposal.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuardLogin } from "./services/auth-guard-login.service";
import { AuthGuardAdmin } from "./services/auth-guard-admin.service";
import { LogoutComponent } from "./components/logout/logout.component";
import { AdminComponent } from './components/admin.component';
import { UserComponent } from './components/user.component';
import { TestingComponent } from './components/testing.component';
import { MessageService } from './services/message.service';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { ProposalComponent } from './proposal/proposal.component';
import { GuidelinesComponent } from './components/guidelines/guidelines.component';
import { EditProposalComponent } from './edit-proposal/edit-proposal.component';
import { ApiInterceptor } from "./api-interceptor";

export function tokenGetter() {
	return localStorage.getItem('access_token');
}

@NgModule({
	declarations: [
		AppComponent,
		AdminComponent,
		ImprintComponent,
		HomeComponent,
		ContactComponent,
		RegisterComponent,
		LoginComponent,
		LogoutComponent,
		ProposalsComponent,
		TestingComponent,
		UserComponent,
		ProposalComponent,
		GuidelinesComponent,
		EditProposalComponent
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
				whitelistedDomains: [ 'esss.se, esss.lu.se, demax.esss.se, localhost:3000, localhost:4200' ],
				blacklistedRoutes: []
			}
		})
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true
		},
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
