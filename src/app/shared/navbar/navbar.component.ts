import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
username;
role;
  constructor(public router: Router , private translate: TranslateService ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
  changeLanguage(lang) {
    this.translate.use(lang);
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.role = sessionStorage.getItem('role');

  }
  onLogOut () {
    this.router.navigateByUrl('/login');
    sessionStorage.clear();
  }
}


