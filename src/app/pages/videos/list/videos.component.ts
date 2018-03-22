import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {EmbedVideoService} from 'ngx-embed-video';
import {Router} from '@angular/router';
import {VideoService} from '../../../service/video.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  iframe_html: any;
  youtubeUrl = 'https://www.youtube.com/watch?v=8FNwzhfPCGw';
  videos;
  searchText;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private embedService: EmbedVideoService,
              public videoService: VideoService, private router: Router) {
    this.iframe_html = this.embedService.embed(this.youtubeUrl);
    this.toastr.setRootViewContainerRef(vcr);
  }

  newVideo() {
    this.router.navigateByUrl('/newVideo');
  }

  ngOnInit() {
    this.videoService.getVideos()
      .subscribe(data => {
          this.videos = data;
        },
        err => {
          console.log(err);
        });
  }

  viewVideo(id) {
    this.router.navigate(['/viewVideo', id]);
  }

  onDeleteVideo(videos) {
    this.videoService.deleteVideo(videos.id)
      .subscribe(data => {
        this.videos.splice(this.videos.indexOf(videos), 1);
        this.toastr.success('video  ' + videos.name + '  deleted', 'Success!');
      }, err => {
        console.log(err);
      });
  }

  onUpdateVideo(id) {
    this.router.navigate(['/updateVideo', id]);

  }
}
