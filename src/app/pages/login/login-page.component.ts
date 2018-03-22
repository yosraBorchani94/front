import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentification.service';
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  mode = 0;
  constructor(public authService: AuthenticationService , private router: Router) { }

  ngOnInit() {
  }
  onLogin(user) {
    this.authService.login(user)
      .subscribe(resp => {
          // console.log(user)
          const jwt = resp.headers.get('Authorization');
          console.log('jwt' + jwt);
          this.authService.saveToken(jwt);
          sessionStorage.setItem('username', user.username);
          sessionStorage.setItem('idUser', user.id)
          sessionStorage.setItem('role', this.authService.returnRole())
          this.router.navigateByUrl('/full-layout');
        },
        err => {
          this.mode = 1;
        });
  }
  onForgotPassword () {
    this.router.navigateByUrl('/forgotpassword');
  }
}
