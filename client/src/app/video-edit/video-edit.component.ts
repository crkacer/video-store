import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { VideoService} from '../video.service';
import { Video } from '../models/video';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {

  video: Video;
  videoID: String;
  status: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    // this.videoID = this.activatedRoute.url.value[1].path;
    this.videoID = this.activatedRoute.snapshot.params.id;
    console.log(this.videoID);

    this.videoService.getVideoById(this.videoID)
      .subscribe(video => { 
        this.video = video; 
        if (video.status !== 'Available') this.status = 'Unavailable';
        else this.status = 'Available';
      });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    console.log(fileList);
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('image', file);
      this.videoService.postUploadImage(formData)
        .subscribe(
            data => {
              if (data.hasOwnProperty("location")) this.video.image = environment.resourceURL + data['location'];
              console.log(this.video);
              console.log(data);
            },
            error => console.log(error)
        )
    }
  }

  updateVideo(event, id) {
    this.video.star = this.video.star.toString();
    this.video.status = this.status;
    this.videoService.putUpdateVideo(id, this.video)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log(error)
    );
  }

}
