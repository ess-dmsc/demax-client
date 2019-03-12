import { AppBrowserModule } from './app/app.browser.module';
import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';

if(environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppBrowserModule)
.catch(err => console.error(err));
