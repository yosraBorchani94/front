import {Component, OnInit} from '@angular/core';
import {ROUTESAdmin} from './sidebar-routes.config';
import {ROUTESUser} from './sidebar-routes.config';
import {ROUTESFormateur} from './sidebar-routes.config';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslateService} from 'ng2-translate';
declare var $: any;

@Component({
  // moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  roleSession = sessionStorage.getItem('role');

  constructor(private router: Router, private translate: TranslateService,
              private route: ActivatedRoute) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    $.getScript('./assets/js/app-sidebar.js');
    if (this.roleSession === 'ADMIN ROLE') {
      this.menuItems = ROUTESAdmin.filter(menuItem => menuItem);
    } else if (this.roleSession === 'USER ROLE') {
      this.menuItems = ROUTESUser.filter(menuItem => menuItem);
    } else {
      this.menuItems = ROUTESFormateur.filter(menuItem => menuItem);
    }

  }

}
