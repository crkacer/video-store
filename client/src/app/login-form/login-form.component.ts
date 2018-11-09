import { Component, OnInit } from '@angular/core';
import {LoginService} from './login-form.service';
import {User} from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import {AuthToken} from '../models/auth_token';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  userLogin: User;
  constructor(
    private loginService: LoginService,
    private cookieService: CookieService) { }
  
  ngOnInit() {
  }

  login(username: string, password: string) {
    this.userLogin = {username, password};
    if (this.userLogin) {
      this.loginService.login(this.userLogin)
        .subscribe((authData: AuthToken)=> this.setCookie(authData.username, authData.token));
      this.userLogin = undefined;
    }
  }

  setCookie(name: string, value: string) {
    this.cookieService.set("auth_name", name);
    this.cookieService.set("auth_token", value);
  }

}
