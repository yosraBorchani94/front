import {Component, OnInit} from '@angular/core';
import {EventService} from '../../service/EventService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.scss']
})
export class ParticipateComponent implements OnInit {
  events;
  username = sessionStorage.getItem('username');
  participate;
  eventsRst;
  test;

  constructor(private router: Router, public eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe(data => {
          this.test = [];
          this.events = data;
          this.events.forEach(e => {
            this.eventService.getEventFromAcceptedEvent(e.id)
              .subscribe(data1 => {
                  if (data1 === null) {
                    // event does not exist in Accepted Users
                    console.log('event does not exist in Accepted Users');
                    this.test.push('false')
                  } else {
                    console.log(data1)
                    // event does exist in Accepted Users
                    // check if user accepted it
                    console.log('event does exist in Accepted Users');
                    this.test.push('true')
                  }
                  console.log(this.test)
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

  /*ngOnInit() {
    this.eventService.getEvents()
      .subscribe(data => {
          this.events = data;
          this.events.forEach(e => {
            this.eventService.getEventFromAcceptedEvent(e.id)
              .subscribe(data1 => {
                  this.events1 = data1;
                  console.log(this.events1)
                  if (!this.test) {
                    this.test = [];
                  }
                  if (this.events1) {
                    if (this.username === this.events1.username) {
                      console.log('true');
                      this.test.push('true');
                    } else {
                      console.log('false');
                      this.test.push('false');
                    }
                  } else {
                    this.test.push('false');
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
    console.log(this.test)
  }
*/
  onParticipate(value) {
    this.eventService.participate(value)
      .subscribe(data => {
          this.participate = data;
        },
        err => {
          console.log(err);
        });
  }
  t() {
    if (this.test.length >= 1){
      return true;
    }
    return false;
  }
}
