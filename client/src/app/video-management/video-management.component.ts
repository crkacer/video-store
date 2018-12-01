import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { VideoService } from '../video.service';
import { Video } from '../models/video';
import '@swimlane/ngx-datatable/release/index.css';
import '@swimlane/ngx-datatable/release/themes/material.css';
import '@swimlane/ngx-datatable/release/assets/icons.css';
import { TableModel, TableItem, TableHeaderItem } from "carbon-components-angular";
import { Router } from '@angular/router';

interface VideoData {
  videos ?: Video[],
  offset ?: number,
  count ?: number
}

const tableHeader: Array<TableHeaderItem> = [
  new TableHeaderItem({ data: "Title" }),
  new TableHeaderItem({ data: "Running Time" }),
  new TableHeaderItem({ data: "Genre" }),
  new TableHeaderItem({ data: "Rating" }),
  new TableHeaderItem({ data: "Director" }),
  new TableHeaderItem({ data: "Status" }),
  new TableHeaderItem({ data: "Update" }),
  new TableHeaderItem({ data: "Delete" })
]

@Component({
  selector: 'app-video-management',
  templateUrl: './video-management.component.html',
  styleUrls: ['./video-management.component.css']
})
export class VideoManagementComponent implements OnInit {

  videoData: VideoData = {};
  loading=  true;

  @Input() videoTable = new TableModel();

  @ViewChild("UpdateTemplateRef") updateRef: TemplateRef<any>;
  @ViewChild("DeleteTemplateRef") deleteRef: TemplateRef<any>;

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit() {
    this.getListVideo();
  }

  getListVideo() {
    this.videoTable.pageLength = 10;
    this.videoService.getVideoList()
    .subscribe(
      data => {
        this.videoData = {videos: data, offset: 0, count: data.length};
        this.videoTable.data = this.generateContent(
          this.videoData.videos
        );
        this.videoTable.totalDataLength = this.videoData.count;
        this.selectPage(1);
        this.videoTable.header = tableHeader;
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  deleteVideo(id) {
    console.log(id);
    const confrm = confirm("Are you sure to delete Video?");

    if (confrm) {
      
      this.videoService.deleteVideo(id)
      .subscribe(
        data => this.getListVideo(),
        error => console.log(error)
      );
    }
  }

  updateFilter(event) {
    const search = event.target.value;
    this.videoTable.header = tableHeader;
    this.videoTable.data = this.generateContent(this.videoData.videos)
      .filter(data => data.reduce((acc, cell, i) => 
         (acc || cell.data.toString().toLowerCase().includes(search && search.toLowerCase()))
        , false)
    );
  }
  generateContent(videos) {
    console.log(videos);
    return videos.map(video => 
       [
        new TableItem({ data: video.title }),
        new TableItem({ data: `${video.length} minutes` }),
        new TableItem({ data: video.genre }),
        new TableItem({ data: `${video.star} stars` }),
        new TableItem({ data: video.director }),
        new TableItem({ data: (video.status === 'Available' ? video.status : 'Unavailable')}),
        new TableItem({ data: video._id, template: this.updateRef }),
        new TableItem({data: video._id, template: this.deleteRef})
      ]
    );
  }

  customSort(index: number) {
    this.sort(this.videoTable, index);
  }

  sort(model, index: number) {
    if (model.header[index].sorted) {
      model.header[index].ascending = model.header[index].descending;
    }
    model.sort(index);
  }
  getPage(page: number) {
    const line = data => data && data.map(column => {
        return { data: column.data, template: column.template };
      })
  
    const fullPage = [];

    for (let i = (page - 1) * this.videoTable.pageLength; (i < page * this.videoTable.pageLength && i < this.videoTable.totalDataLength); i++) {
      fullPage.push(line(this.videoTable.data[i]));
    }

    return new Promise(resolve =>
      setTimeout(() => resolve(fullPage), 10)
    );
  }

  handleDelete(id) {
    this.deleteVideo(id);
  }
  handleUpdate(id) {
    this.router.navigateByUrl('/portal/video-edit/' + id);
  }
  selectPage(page) {
    this.getPage(page).then((data: Array<Array<any>>) => {
      this.videoTable.data = this.prepareData(data);
      this.videoTable.currentPage = page;
    });
  }
  prepareData(data: Array<Array<any>>) {
    let newData = [];
    data.forEach(dataRow => {
      let row = [];
      if (dataRow)
        dataRow.forEach(dataElement => 
          row.push( new TableItem({data: dataElement.data, template: dataElement.template })
        ));
      newData.push(row);
    });
    return newData;
  }


}
