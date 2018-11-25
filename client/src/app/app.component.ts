import { Component, OnInit, isDevMode } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VideoService } from './video.service';
import { Video } from './models/video';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'video-store';
  cookieValue: string;
  search: string = "";
  searchChangeObserver;
  videoSuggestions: Video[];
  chosenSuggestion: string;
  videos: Video[];
  chosenVideo: Video;
  
  constructor(
    private cookieService: CookieService,
    private videoService: VideoService,
    private router: Router) {}

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
      }).pipe(debounceTime(500))
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

  enterSearch() {
    console.log(this.chosenVideo);
    if (this.chosenVideo !== null) 
      this.router.navigateByUrl('/video/' + this.chosenVideo["_id"]);
    this.chosenVideo = null;
  }

  changeSuggestion(title) {
    this.chosenVideo =  this.videoSuggestions.find(video => video.title === title);
    console.log(this.chosenVideo["_id"]);
  }
}
