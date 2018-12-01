import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from './http-error-handler.service';
import { Observable } from 'rxjs';
import {Auth} from './models/auth';
import {AuthToken} from './models/auth_token';
import { CookieService } from 'ngx-cookie-service';

import { Store } from "@ngrx/store";
import {Log} from './models/log';
import {LOGGED_OUT} from "./store/auth";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
    })
};


@Injectable()
export class AuthService {
    loginURL = 'http://localhost:4040/api/auth/login';
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler,
        private cookieService: CookieService,
        private store: Store<Log>
    ) {
        this.handleError = httpErrorHandler.createHandleError('LoginService');
    }

    login(user: Auth):Observable<AuthToken> {
        return this.http.post<AuthToken>(this.loginURL, user, httpOptions);
    }

    logout() {
        this.store.dispatch({type: LOGGED_OUT});
        this.cookieService.deleteAll();
    }
}