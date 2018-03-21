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
  sub;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public eventService: EventService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.sub = Observable.interval(86400000)
      .subscribe((val) => {
          console.log('called');
          this.sendSecondNotification();
        },
        err => {
          console.log(err);
        });
    this.eventService.getEvents()
      .subscribe(data => {
          this.test = [];
          this.events = data;
          this.events.forEach(e => {
            this.eventService.getEventFromAcceptedEvent(e.id)
              .subscribe(data1 => {
                  if (data1 === null) {
                    // event does not exist in Accepted Users
                    this.test.push(false)
                  } else {
                    // event does exist in Accepted Users check if user accepted it
                    this.acceptedEvent = data1;
                    if (this.username === this.acceptedEvent.username) {
                      this.test.push(true)
                    } else {
                      this.test.push(true)
                    }

                  }
                },
                err => {
                  console.log(err);
                });
          })
        },
        err => {
          console.log(err);
        });
  }

  onParticipate(value) {
    this.eventService.participate(value)
      .subscribe(data => {
          this.participate = data;
          this.ngOnInit();
          this.eventService.getEvent(value.id_event)
            .subscribe(d => {
              this.event = d;
              this.toastr.success('You have participated to ' + this.event.title, 'Success!');
            })
        },
        err => {
          console.log(err);
        });
  }

  sendSecondNotification() {
    this.eventService.sendSecondNotification()
  }
}
