import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../../service/EventService';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmbedVideoService} from 'ngx-embed-video';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
  events: any = '';
  idEvent;
  event: any = '';
  closeResult: string;
  iframe_html: any;
  today = Date.now();
  constructor(public activatedRoute: ActivatedRoute, private modalService: NgbModal, public toastr: ToastsManager, vcr: ViewContainerRef,
              private router: Router, public eventService: EventService, private embedService: EmbedVideoService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.idEvent = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe(data => {
          this.events = data;
        },
        err => {
          console.log(err);
        });
  }

  getEvent(content, idEvent) {
    this.eventService.getEvent(idEvent)
      .subscribe(data => {
          this.event = data;
          this.iframe_html = this.embedService.embed(this.event.broadcastId);
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
