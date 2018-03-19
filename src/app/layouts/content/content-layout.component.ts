import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentification.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.scss']
})

export class ContentLayoutComponent implements OnInit  {
  constructor(public authService: AuthenticationService , private router: Router) { }

  ngOnInit() {
  }
}
