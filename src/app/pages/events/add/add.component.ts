import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../../service/users.service';
import {ToastsManager} from 'ng2-toastr';
import {EventService} from '../../../service/EventService';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  users;
  listUser;
  test;
  today = Date.now();


  constructor(public eventService: EventService, public toastr: ToastsManager, vcr: ViewContainerRef, public usersService: UsersService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(data => {
          this.listUser = data;
        },
        err => {
          console.log(err);
        });

  }

  returnToCalendar() {
    this.router.navigateByUrl('/events');
  }

  onSaveEvent(event) {
    if (event.startDate < this.today || event.endDate < this.today) {
      this.toastr.warning('Please enter a correct date', 'Warning!');
    } else if (event.startDate > event.endDate) {
      this.toastr.warning('Please enter a correct date', 'Warning!');
    } else {
      this.usersService.saveEvent(event)
        .subscribe((data) => {
            this.test = data;
            if (this.test === 1) {
              window.open('https://accounts.google.com/o/oauth2/auth?client_id=915647955437-99ac48e8fitl4ttknf30scfbjau1dv1h.apps.googleusercontent.com&redirect_uri=http://localhost:8080/Callback&response_type=code&scope=https://www.googleapis.com/auth/youtube');
              this.router.navigateByUrl('/events');

            } else {
              this.toastr.warning('event not created', 'Warning!');
            }
          },
          err => {
            console.log(err);
          });
    }
  }


}
