import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../../service/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  myList = [];
  users;
  listUser;

  constructor(public usersService: UsersService, private router: Router) {
  }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(data => {
          this.listUser = data;
          for (const user of this.listUser) {
            this.myList.push(user.username)
          }
          console.log('myList: ' + this.myList)
        },
        err => {
          console.log(err);
        });
  }

  returnToCalendar() {
    this.router.navigateByUrl('/events');
  }

  onSaveEvent(event) {
    this.usersService.saveEvent(event)
      .subscribe(data => {
          this.router.navigateByUrl('/events');
        },
        err => {
          console.log(err);
        });
  }
}
