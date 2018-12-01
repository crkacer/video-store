import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import {Auth} from '../models/auth';
import { Router } from '@angular/router';
import { Store } from "@ngrx/store";
import {Log} from '../models/log';
import {LOGGED_IN} from "../store/auth";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  userLogin: Auth;
  loginError: Boolean = false;
  expiredDate: Date;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private store: Store<Log>
  ) { }
  
  ngOnInit() {
  }

  login(username: string, password: string) {
    this.userLogin = {username, password};
    if (this.userLogin) {
      this.authService.login(this.userLogin)
        .subscribe(authData => {
          this.loginError = false;
          this.setCookie(authData.username, authData.token);
          this.store.dispatch({type: LOGGED_IN});
          this.router.navigateByUrl('/portal/video-management');

        });
      this.userLogin = undefined;
      this.loginError = true;
    }
  }

  setCookie(name: string, value: string) {

    this.expiredDate = new Date();
    this.expiredDate.setDate( this.expiredDate.getDate() + 2 );

    this.cookieService.deleteAll();
    this.cookieService.set("auth_name", name, this.expiredDate);
    this.cookieService.set("auth_token", value, this.expiredDate);
  }

}
