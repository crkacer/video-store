import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Video } from '../models/video';
import { environment } from '../../environments/environment';

@Component({
  selector: 'video-create',
  templateUrl: './video-creation.component.html',
  styleUrls: ['./video-creation.component.css']
})
export class VideoCreationComponent implements OnInit {

  private video: Video = {
    title: "",
    image: "",
    genre: "",
    director: "",
    status: "Available",
    star: "",
    length: 0,
    description: ""
  };

  constructor(
    private videoService: VideoService
  ) { }

  ngOnInit() {
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

  createVideo(event) {
    this.video.star = this.video.star.toString();
    console.log(this.video);
    this.videoService.postCreateVideo(this.video)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error)
    );
  }

}
