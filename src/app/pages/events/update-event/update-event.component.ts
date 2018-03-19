import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {EventService} from '../../../service/EventService';
import {Event} from '../../../modele/modele.event';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  idEvent;
  event: any;

  constructor(public activatedRoute: ActivatedRoute, public eventService: EventService, private router: Router) {
    this.idEvent = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.eventService.getEvent(this.idEvent)
      .subscribe(data => {
        this.event = data;
        console.log(this.event)
      }, err => {
        console.log(err);
      });
  }

  returnToCalendar() {
    this.router.navigateByUrl('/events');
  }

  update() {
    this.eventService.updateEvent(this.event)
      .subscribe(resp => {
          this.event = resp;
          this.router.navigateByUrl('/events');
        },
        err => {
          console.log('err' + err);
          console.log(this.event);
        });
  }
}
