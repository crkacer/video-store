import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  cookieValue: string;

  constructor(private cookieService: CookieService, 
    private router: Router) { }

  ngOnInit() {
    this.cookieValue = 'UNKNOWN';
    this.cookieValue = this.cookieService.get('auth_token');

    if (this.cookieValue == '') {
      this.router.navigateByUrl('/videos');
    }

  }

}
