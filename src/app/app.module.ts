import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppConfigModule } from './app-config.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './external/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ImprintComponent } from './imprint/imprint.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HttpErrorHandler } from './shared/http-error-handler.service';
import { ApiInterceptor } from './user/api-interceptor';
import { SharedModule } from "./shared/shared.module";
import { ProposalModule } from "./proposal/proposal.module";
import { UserModule } from "./user/user.module";
import { FileModule } from "./file/file.module";
import { AdminModule } from "./admin/admin.module";

export function tokenGetter() {
	return localStorage.getItem('access_token');
}

@NgModule({
	declarations: [
		AppComponent,
		ImprintComponent,
		HomeComponent,
		ContactComponent
	],
	imports: [
		AdminModule,
		AppConfigModule,
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		FileModule,
		FormsModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: [
					'esss.se, esss.lu.se, demax.esss.se, localhost:3000, localhost:4200'
				],
				blacklistedRoutes: []
			}
		}),
		ReactiveFormsModule,
		MaterialModule,
		ProposalModule,
		SharedModule,
		UserModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true
		},
		HttpErrorHandler
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
