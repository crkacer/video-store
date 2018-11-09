import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'video-store';
  cookieValue = 'UNKNOWN';

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.cookieService.set("TOKEN", "token");
    this.cookieValue = this.cookieService.get('TOKEN');
    console.log(this.cookieValue);
  }
}
