import { BrowserModule } from '@angular/platform-browser';
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
import { ImprintComponent } from './pages/imprint/imprint.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProposalListComponent } from './pages/proposals/proposal-list/proposal-list.component';
import { ProposalDetailsComponent } from './pages/proposals/proposal-details/proposal-details.component';
import { ProposalService } from './pages/proposals/proposal.service';

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
        ProposalDetailsComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        UploadModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule,
        MaterialModule,
        JwtModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [ ProposalService ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
