import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppConfigModule } from './app-config.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadModule } from './upload/upload.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ImprintComponent } from './imprint/imprint.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProposalListComponent } from './proposal-list/proposal-list.component';
import { ProposalDetailsComponent } from './proposal-details/proposal-details.component';
import { ProposalService } from './proposal.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ToastComponent } from './components/toast/toast.component';
import { FormlyModule } from '@ngx-formly/core';
import { AuthGuard } from "./services/auth.guard";

export function tokenGetter() {
	return localStorage.getItem('token');
}

@NgModule({
	declarations: [
		AppComponent,
		ImprintComponent,
		HomeComponent,
		ContactComponent,
		NotFoundComponent,
		RegisterComponent,
		LoginComponent,
		ProposalListComponent,
		ProposalDetailsComponent,
		ToastComponent
	],
	imports:[
 CommonModule,
NgtUniversalModule,
 
		AppConfigModule,
		AppRoutingModule,
		
		BrowserAnimationsModule,
		UploadModule,
		FormsModule,
		FormlyModule.forRoot(),
		ReactiveFormsModule,
		HttpClientModule,
		HttpModule,
		MaterialModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: ['localhost:4000'],
				blacklistedRoutes: ['localhost:4000/api/auth']
			}
		})
	],
	providers: [
		AuthService,
		AuthGuard,
		UserService,
		ProposalService,
		ToastComponent
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {
}
