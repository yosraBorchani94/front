import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {ModuleService} from '../../../../service/module.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {

  module;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onSaveModule(module) {
    if (module.duree < 0 )  {
      this.toastr.warning('Please enter a valid duration', 'Warning!');
    } else  if (module.nbr_question < 0) {
      this.toastr.warning('Please enter a valid number of questions', 'Warning!');
    } else {
      this.moduleService.saveModule(module)
        .subscribe((data) => {
            this.module = data;
            this.toastr.success('New module created', 'Success!');
            setTimeout(() => {
              this.router.navigateByUrl('/module');
            }, 2000);
          },
          err => {
            console.log(err);
          });
    }
  }

  returnToModule() {
    this.router.navigateByUrl('/module');
  }

}
