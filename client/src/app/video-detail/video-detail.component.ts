import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { VideoService} from '../video.service';
import { Video } from '../models/video';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  video: Video
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    // const videoID = this.activatedRoute.url.value[1].path;
    const videoID = this.activatedRoute.snapshot.params.id;
    console.log(videoID);

    this.videoService.getVideoById(videoID)
      .subscribe(video => { this.video = video; console.log(video)});
  }

}
