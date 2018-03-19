import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../../../service/EventService';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  searchText
  events;

  constructor(private router: Router, public eventService: EventService) {
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
        console.log(err);
      });
    this.eventService.deleteEventFromAccpetedUsers(events.id)
      .subscribe(data => {
      }, err => {
        console.log(err);
      });
  }
}
