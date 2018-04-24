import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {EventService} from '../../service/EventService';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.scss']
})
export class ParticipateComponent implements OnInit {
  events;
  username = sessionStorage.getItem('username');
  participate;
  test;
  acceptedEvent;
  event;

  unparticip;
  today = Date.now();
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public eventService: EventService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe(data1 => {
       this.events = data1;
        },
        err => {
          console.log(err);
        });



    this.eventService.getEventFromAcceptedEvent(this.username)
      .subscribe(data1 => {
        this.acceptedEvent = data1;
        },
        err => {
          console.log(err);
        });
  }

  onParticipate(value) {
    this.eventService.participate(value)
      .subscribe(data => {
          this.participate = data;
          this.eventService.getEvent(value.idEvent)
            .subscribe(d => {
              this.event = d;
              this.toastr.success('You have participated to ' + this.event.title, 'Success!');
              this.ngOnInit()
            })
        },
        err => {
          console.log(err);
        });
  }

  unparticipate(value) {
    this.eventService.unparticipate(value)
      .subscribe(data => {
        this.ngOnInit()
        },
        err => {
          console.log(err);
        });
  }

  sendSecondNotification() {
    this.eventService.sendSecondNotification()
  }
}
