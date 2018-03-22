import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
username;
role
  constructor(public router: Router) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.role = sessionStorage.getItem('role');
  }
  onLogOut () {
    this.router.navigateByUrl('/login');
  }
}


