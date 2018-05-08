import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../../service/users.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  searchText;
  usersWithRole;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public usersService: UsersService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(data => {
          this.users = data;
        },
        err => {
          console.log(err);
        });

    this.usersService.getUsersWithRole()
      .subscribe(data => {
          this.usersWithRole = data;
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
        this.toastr.success('User' + users.username + '  deleted', 'Success!');
        this.ngOnInit();
      }, err => {
        this.ngOnInit();
        console.log(err);
      });
  }


}

