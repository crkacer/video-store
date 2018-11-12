import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Video } from '../models/video';

@Component({
  selector: 'app-video-management',
  templateUrl: './video-management.component.html',
  styleUrls: ['./video-management.component.css']
})
export class VideoManagementComponent implements OnInit {

  videos: Video[];
  isModalVisible = false;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.getListVideo();
  }

  getListVideo() {
    this.videoService.getVideoList()
    .subscribe(videos => { this.videos = videos; console.log(videos)});
  }

  deleteVideo(id) {
    console.log(id);
    const confrm = confirm("Are you sure to delete Video?");

    if (confrm) {
      this.videoService.deleteVideo(id)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    }
  }

}
