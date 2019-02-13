import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from "../external/material.module";

import { MessageComponent } from './message/message.component';
import { LoadingComponent } from './loading/loading.component';
import { RouterModule } from "@angular/router";
import { MessageService } from "./message.service";

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
		MaterialModule,
		RouterModule,
		MessageComponent,
		LoadingComponent
	],
	declarations: [
		MessageComponent,
		LoadingComponent
	],
	providers: [
		MessageComponent
	]
})
export class SharedModule { }