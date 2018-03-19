import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
username;
  constructor(public router: Router) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }
  onLogOut () {
    this.router.navigateByUrl('/login');
  }
}


