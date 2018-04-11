import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {ModuleService} from '../../service/module.service';
import {VideoService} from '../../service/video.service';

@Component({
  selector: 'app-watch-videos',
  templateUrl: './watch-videos.component.html',
  styleUrls: ['./watch-videos.component.scss']
})
export class WatchVideosComponent implements OnInit {
  modules;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,
              public videoService: VideoService, private router: Router, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.moduleService.getModules()
      .subscribe(data => {
          this.modules = data;
        },
        err => {
          console.log(err);
        });
  }

  getVideoesByModule(id) {
    this.router.navigate(['/videosByModule', id]);
  }

}
