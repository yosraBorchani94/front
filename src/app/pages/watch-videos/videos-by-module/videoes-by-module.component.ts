import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ModuleService} from '../../../service/module.service';
import {VideoService} from '../../../service/video.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmbedVideoService} from 'ngx-embed-video';


@Component({
  selector: 'app-videoes-by-module',
  templateUrl: './videoes-by-module.component.html',
  styleUrls: ['./videoes-by-module.component.scss']
})
export class VideoesByModuleComponent implements OnInit {
  iframe_html: any;
  idModule;
  videosByModule;
  closeResult: string;
  video: any = '';

  constructor(private modalService: NgbModal, public toastr: ToastsManager, vcr: ViewContainerRef, public activatedRoute: ActivatedRoute,
              public videoService: VideoService, private router: Router, private embedService: EmbedVideoService) {
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

  getVideo(content, idVideo) {
    this.videoService.getVideo(idVideo)
      .subscribe(data => {
          this.video = data;
          this.iframe_html = this.embedService.embed(this.video.url);
        },
        err => {
          console.log(err);
        });

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
