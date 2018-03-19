import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../../service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  searchText;
  constructor(public usersService: UsersService , private router: Router ) {
  }
  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(data => {
          this.users = data;
        },
        err => {
          console.log(err);
        });
  }
  register() {
    this.router.navigateByUrl('/register');
  }

  onUpdateUser(id: number) {
    this.router.navigate(['/update-user', id]);
  }

  onDeleteUser(users) {
    this.usersService.deleteUser(users.id)
      .subscribe(data => {
        this.users.splice(this.users.indexOf(users), 1);
      }, err => {
        console.log(err);
      });
  }


}

