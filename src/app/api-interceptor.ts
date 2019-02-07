import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from "./app-config.module";
import { APP_CONFIG } from "./app-config.module";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(
        @Inject(APP_CONFIG) private appConfig: AppConfig
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedHttpRequest = request.clone({url: this.appConfig.demaxBaseUrl + request.url});
        //setHeaders: {
        //         Authorization: `Bearer ${this.auth.getToken()}`
        //       }
        return next.handle(clonedHttpRequest);
    }
}
