import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
    
    @NgModule({
 bootstrap: [AppComponent],

        imports:[
 BrowserModule.withServerTransition({appId: 'app-root'}),
 
 AppModule,
 
 GraphQLModule,
 
 HttpClientModule,
 
        ]
    })
    export class AppBrowserModule {}
    