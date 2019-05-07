import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from "../external/material.module";
import { RouterModule } from "@angular/router";

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MessageComponent, SnackBarMessageComponent } from './message/message.component';
import { LoadingComponent } from './loading/loading.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
	declarations: [
		MessageComponent,
		LoadingComponent,
		LogoComponent,
		HeaderComponent,
		SidebarComponent,
		SnackBarMessageComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MaterialModule,
		RouterModule
	],
	providers: [
		MessageComponent
	],
	entryComponents: [
		SnackBarMessageComponent
	],
	exports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HeaderComponent,
		HttpClientModule,
		LoadingComponent,
		LogoComponent,
		MaterialModule,
		MessageComponent,
		ReactiveFormsModule,
		RouterModule,
		SidebarComponent
	]
})
export class SharedModule {
}