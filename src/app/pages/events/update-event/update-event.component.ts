import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {EventService} from '../../../service/EventService';
import {Event} from '../../../modele/modele.event';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  idEvent;
  event: any = '';

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public activatedRoute: ActivatedRoute,
              public eventService: EventService, private router: Router) {
    this.idEvent = activatedRoute.snapshot.params['id'];
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.eventService.getEvent(this.idEvent)
      .subscribe(data => {
        this.event = data;
      }, err => {
        console.log(err);
      });
  }

  returnToCalendar() {
    this.router.navigateByUrl('/events');
  }

  update() {
    if (this.event.startDate > this.event.endDate) {
      this.toastr.warning('Please enter a correct date', 'Warning!');
    } else {
      this.eventService.updateEvent(this.event)
        .subscribe(resp => {
            this.event = resp;
            this.toastr.success('event ' + this.event.title + ' updated', 'Success!');
            setTimeout(() => {
              this.router.navigateByUrl('/events');
            }, 2000);
          },
          err => {
            console.log('err' + err);
            this.toastr.warning('event ' + this.event.title + ' not created', 'Warning!');
          });
    }
  }
}
