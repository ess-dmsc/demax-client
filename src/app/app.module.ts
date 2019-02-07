import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppConfigModule } from './app-config.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './external/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ImprintComponent } from './imprint/imprint.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProposalService } from './services/proposal.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { AccountComponent } from './account/account.component';
import { MessageComponent } from './message/message.component';
import { ProposalDetailComponent } from './proposal-detail/proposal-detail.component';
import { ProposalListComponent } from './proposal-list/proposal-list.component';
import { ApiInterceptor } from './api-interceptor';



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
		AccountComponent,
		MessageComponent,
		ProposalDetailComponent,
		ProposalListComponent
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
				whitelistedDomains: [
					'esss.se, esss.lu.se, demax.esss.se, localhost:3000, localhost:4200'
				],
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
		UserService,
		ProposalService,
		MessageComponent
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	exports: [ MessageComponent ]
})
export class AppModule {
}
