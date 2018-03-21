import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../../../service/EventService';
import {forEach} from '@angular/router/src/utils/collection';
import {DatePipe} from '@angular/common';
import {ToastsManager} from 'ng2-toastr';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  searchText
  events;
  event;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public eventService: EventService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe(data => {
          this.events = data;
          // this.events.forEach(e => {
          // })
        },
        err => {
          console.log(err);
        });
  }

  newEvent() {
    this.router.navigateByUrl('/addEvent');
  }

  onUpadate(id) {
    this.router.navigate(['/updateEvent', id]);
  }

  onDelete(events) {
    this.eventService.deleteEvent(events.id)
      .subscribe(data => {
        this.events.splice(this.events.indexOf(events), 1);
      }, err => {
        this.toastr.success('event ' + events.title + ' deleted', 'Success!');
        console.log(err);
      });
    this.eventService.getEvent(events.id)
      .subscribe(data => {
        this.event = data;
        if (this.event != null) {
          this.eventService.deleteEventFromAccpetedUsers(events.id)
            .subscribe(data1 => {
              this.toastr.success('event:' + events.title + ' deleted', 'Success!');
            }, err => {
              console.log(err);
            });
        } else {
          this.toastr.success('event: ' + events.title + ' deleted', 'Success!');
        }
      }, err => {
        console.log(err);
      });
  }
}
