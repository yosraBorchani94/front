import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../../service/module.service';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.scss']
})
export class UpdateModuleComponent implements OnInit {
  idModule;
  module: any = '';
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router,
              public activatedRoute: ActivatedRoute, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.idModule = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.moduleService.getModule(this.idModule)
      .subscribe(data => {
        this.module = data;
      }, err => {
        console.log(err);
      });
  }

  update() {
    if (this.module.duree < 0) {
      this.toastr.warning('Please enter a valid duration', 'Warning!');
    } else if (this.module.nbr_question < 0) {
      this.toastr.warning('Please enter a valid number of questions', 'Warning!');
    } else {
      this.moduleService.updateModule(this.module)
        .subscribe((data) => {
            this.module = data;
            this.toastr.success('module updated', 'Success!');
            setTimeout(() => {
              this.router.navigateByUrl('/module');
            }, 2000);
          },
          err => {
            console.log(err);
            this.toastr.warning('Duplicate module name', 'warning!');
          });
    }
  }

  returnToModule() {
    this.router.navigate(['/module']);
  }

}
