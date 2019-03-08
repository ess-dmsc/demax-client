import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from "../external/material.module";

import { MessageComponent } from './message/message.component';
import { LoadingComponent } from './loading/loading.component';
import { RouterModule } from "@angular/router";
import { MessageService } from "./message.service";
import { HeaderComponent } from './header/header.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MaterialModule,
		RouterModule
	],
	exports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		HeaderComponent,
		MaterialModule,
		RouterModule,
		MessageComponent,
		LoadingComponent
	],
	declarations: [
		MessageComponent,
		LoadingComponent,
		HeaderComponent
	],
	providers: [
		MessageComponent
	]
})
export class SharedModule { }