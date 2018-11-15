import { Component, OnInit } from '@angular/core';
import {LoginService} from './login-form.service';
import {User} from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import {Auth} from '../models/auth';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  userLogin: Auth;
  loginError: Boolean = false;
  constructor(
    private loginService: LoginService,
    private cookieService: CookieService) { }
  
  ngOnInit() {
  }

  login(username: string, password: string) {
    this.userLogin = {username, password};
    if (this.userLogin) {
      this.loginService.login(this.userLogin)
        .subscribe(authData => {
          this.loginError = false;
          this.setCookie(authData.username, authData.token);
        });
      this.userLogin = undefined;
      this.loginError = true;
    }
  }

  setCookie(name: string, value: string) {
    this.cookieService.set("auth_name", name);
    this.cookieService.set("auth_token", value);
  }

}
