import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Auth} from '../models/auth';
import {AuthToken} from '../models/auth_token';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };


@Injectable()
export class LoginService {
    loginURL = 'http://localhost:4040/api/auth/login';
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('LoginService');
      }

    login(user: Auth):Observable<AuthToken> {
        return this.http.post<AuthToken>(this.loginURL, user, httpOptions);
    }
}