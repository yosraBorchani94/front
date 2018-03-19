import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {VideoService} from '../../../service/video.service';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  video;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef , public videoService: VideoService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }
  close () {
    this.router.navigateByUrl('/videos');
  }
  onRegister(video) {
    this.videoService.register(video)
      .subscribe(resp => {
          this.video = resp;
          this.toastr.success('New video created', 'Success!');
          setTimeout(() => {
            this.router.navigateByUrl('/videos');
          }, 2000);
        },
        err => {
          console.log('err' + err);
        });
  }
}
