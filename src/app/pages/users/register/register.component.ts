import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UsersService} from '../../../service/users.service';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: any;
  roles: any;
  roleName;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public usersService: UsersService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.usersService.getRoles()
      .subscribe(data => {
          this.roles = data;
        },
        err => {
          console.log(err);
        });
  }

  onRegister(user) {
    if (user.password === user.repassword) {
      this.usersService.register(user)
      .subscribe(resp => {
          this.user = resp;
          this.toastr.success('New user created', 'Success!');
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 2000);
        },
        err => {
          console.log('err' + err);
        });
    } else {
      this.toastr.error('Not matching password/repassword', 'Error');
    }
  }

  OnCancel() {
    this.router.navigateByUrl('/users');
  }

}
