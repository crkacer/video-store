import { Component, OnInit, isDevMode } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VideoService } from './video.service';
import { Video } from './models/video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'video-store';
  cookieValue;
  search = "";
  searchChangeObserver;
  videoSuggestions: Video[]
  
  constructor(
    private cookieService: CookieService,
    private videoService: VideoService) {}

  ngOnInit(): void {
    this.cookieValue = 'UNKNOWN';
    this.cookieValue = this.cookieService.get('auth_token');
    console.log(this.cookieValue);

    if (isDevMode()) console.log('👋 Development!');
    else console.log('💪 Production!');
  }

  searchChanged(searchValue: string) {
    // handle debounce search input
    if (!this.searchChangeObserver) {
      Observable.create(observer => {
        this.searchChangeObserver = observer;
      }).pipe(debounceTime(1000))
        .pipe(distinctUntilChanged())
        .subscribe(
          data => {
            this.videoService.getSearchVideo(data)
            .subscribe(vdz => this.videoSuggestions = vdz);
          }
        );
    }
    this.searchChangeObserver.next(searchValue);
  }

  testClick(id:string) {
    console.log(id);
  }
}
