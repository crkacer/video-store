import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { VideoService} from '../video.service';
import { Video } from '../models/video';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  video: Video
  users: User[]
  activeUsers: User[]
  userID: String
  videoID: String
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.videoID = this.activatedRoute.snapshot.params.id;

    this.userService.getUserList()
      .subscribe(users => { 
        this.users = users; 
        this.activeUsers = users.filter(user => user.status === 'Active');
      });

    this.videoService.getVideoById(this.videoID)
      .subscribe(video => { 
        this.video = video; 
        this.userID = video.status !== 'Available' ? video.status : '';
      });
  }

  reserveVideo(event) {
    if (this.userID && this.videoID) {
      this.videoService.postReserveVideo(this.videoID, this.userID)
        .subscribe(
          res => {
            alert("Reserve Successfully!");
            this.router.navigateByUrl("/videos");
          },
          err => alert("Failed to reserve!")
        );

    }
      
  }

}
