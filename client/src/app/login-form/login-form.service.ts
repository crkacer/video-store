import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {User} from '../models/user';
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

    login(user: User):Observable<User> {
        return this.http.post<User>(this.loginURL, user, httpOptions)
            .pipe(
                catchError(this.handleError('postLogin', user))
            )
    }
}