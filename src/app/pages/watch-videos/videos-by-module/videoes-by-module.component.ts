import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ModuleService} from '../../../service/module.service';
import {VideoService} from '../../../service/video.service';

@Component({
  selector: 'app-videoes-by-module',
  templateUrl: './videoes-by-module.component.html',
  styleUrls: ['./videoes-by-module.component.scss']
})
export class VideoesByModuleComponent implements OnInit {

  idModule;
  videosByModule;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public activatedRoute: ActivatedRoute,
              public videoService: VideoService, private router: Router, public moduleService: ModuleService) {
    this.idModule = activatedRoute.snapshot.params['id'];
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.videoService.getVideosByModule(this.idModule)
      .subscribe(data => {
          this.videosByModule = data;
        },
        err => {
          console.log(err);
        });
  }

  getVideo(idModule) {

  }

}
