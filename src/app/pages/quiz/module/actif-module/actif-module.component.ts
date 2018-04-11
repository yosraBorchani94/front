import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModuleService} from '../../../../service/module.service';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-actif-module',
  templateUrl: './actif-module.component.html',
  styleUrls: ['./actif-module.component.scss']
})
export class ActifModuleComponent implements OnInit {

  actifModule;
  inProgressModule;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.moduleService.actifModule()
      .subscribe(data => {
          this.actifModule = data;
        },
        err => {
          console.log(err);
        });
    this.moduleService.inProgressModule()
      .subscribe(data => {
          this.inProgressModule = data;
        },
        err => {
          console.log(err);
        });
  }
}
