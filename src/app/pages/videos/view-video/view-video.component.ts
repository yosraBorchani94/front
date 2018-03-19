import { Component, OnInit } from '@angular/core';
import {EmbedVideoService} from 'ngx-embed-video';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../../service/video.service';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.scss']
})
export class ViewVideoComponent implements OnInit {
  iframe_html: any;
  youtubeUrl = 'https://www.youtube.com/watch?v=8FNwzhfPCGw';
  idVideo;
  video;
  namevideo;
  descriptionvideo;
  constructor( public activatedRoute: ActivatedRoute , public videoService: VideoService , private embedService: EmbedVideoService) {
    this.idVideo = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.videoService.getVideo(this.idVideo)
      .subscribe(data => {
        this.video = data;
        this.iframe_html = this.embedService.embed(this.video.url);
        this.namevideo = this.video.name;
        this.descriptionvideo = this.video.description;
      }, err => {
        console.log(err);
      });
  }

}
