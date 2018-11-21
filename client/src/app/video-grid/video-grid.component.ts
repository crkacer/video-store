import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {VideoService} from '../video.service';
import { Video } from '../models/video';

@Component({
  selector: 'video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.css']
})
export class VideoGridComponent implements OnInit {

  videos: Video[]

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.getListVideo();
  }

  getListVideo() {
    this.videoService.getVideoList()
    .subscribe(videos => { this.videos = videos; console.log(videos)});
  }

  getURL(id) {
    console.log(id);
    return `url(${id})`;

  }

}
