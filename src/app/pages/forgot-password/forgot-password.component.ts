import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  username: String;


  constructor(public usersService: UsersService, private router: Router) {
  }

  ngOnInit() {
  }

  // onSubmit(user) {
  //   this.usersService.forgotPassword(user)
  //     .subscribe(resp => {
  //         this.router.navigateByUrl('/login');
  //       },
  //       err => {
  //         console.log('err' + err);
  //       });
  // }
  onSubmit () {
    console.log(this.username)
    this.usersService.forgotPassword(this.username)
      .subscribe(data => {
          console.log(data);
        },
        err => {
        });
  }

  onLogin() {
    this.router.navigateByUrl('/login');

  }
}
