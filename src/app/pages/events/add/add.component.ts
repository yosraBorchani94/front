import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../../service/users.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  users;
  listUser;
  test;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public usersService: UsersService, private router: Router) {
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
    if (event.startDate > event.endDate) {
      this.toastr.warning('Please enter a correct date', 'Warning!');
    } else {
      this.usersService.saveEvent(event)
        .subscribe((data) => {
            this.test = data;
            this.toastr.success('New event created', 'Success!');
            setTimeout(() => {
              this.router.navigateByUrl('/events');
            }, 2000);
          },
          err => {
            console.log(err);
          });
    }

  }
}
