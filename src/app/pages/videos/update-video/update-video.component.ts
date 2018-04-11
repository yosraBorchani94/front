import {Component, getModuleFactory, OnInit, ViewContainerRef} from '@angular/core';
import {VideoService} from '../../../service/video.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../service/module.service';

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.scss']
})
export class UpdateVideoComponent implements OnInit {
  idVideo;
  video: any = '';
  modules;
  moduleName: any = '';
  moduleByName;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public activatedRoute: ActivatedRoute,
              public videoService: VideoService, private router: Router, public moduleService: ModuleService) {
    this.idVideo = activatedRoute.snapshot.params['id'];
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.videoService.getVideo(this.idVideo)
      .subscribe(data => {
        this.video = data;
        this.moduleName = this.video.module.nom
      }, err => {
        console.log(err);
      });
    this.moduleService.getModules()
      .subscribe(data => {
          this.modules = data;
        },
        err => {
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
           this.toastr.warning('duplicated video Name', 'Warning!');
      });
  }

  update() {
    this.moduleService.getModuleByName(this.moduleName)
      .subscribe(data => {
          this.moduleByName = data;
          this.video.module =  this.moduleByName
        },
        err => {
          console.log(err);
        });
  }
}
