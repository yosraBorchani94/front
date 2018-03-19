import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {VideoService} from '../../../service/video.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.scss']
})
export class UpdateVideoComponent implements OnInit {
  idVideo;
  video: any;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public activatedRoute: ActivatedRoute,
              public videoService: VideoService, private router: Router) {
    this.idVideo = activatedRoute.snapshot.params['id'];
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.videoService.getVideo(this.idVideo)
      .subscribe(data => {
        this.video = data;
      }, err => {
        console.log(err);
      });
  }

  close() {
    this.router.navigateByUrl('/videos');
  }

  updateVideo() {
    this.videoService.updateVideo(this.video)
      .subscribe(data => {
        this.video = data;
        this.toastr.success('video ' + this.video.name + ' updated', 'Success!');
        setTimeout(() => {
          this.router.navigateByUrl('/videos');
        }, 2000);
      }, err => {
        console.log(err);
      });
  }
}
