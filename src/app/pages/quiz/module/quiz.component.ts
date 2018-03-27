import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {ModuleService} from '../../../service/module.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  modules;
  searchText;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.moduleService.getModules()
      .subscribe(data => {
          this.modules = data;
        },
        err => {
          console.log(err);
        });
  }

  newModule() {
    this.router.navigateByUrl('/addModule');
  }

  onDelete(modules) {
    this.moduleService.deleteModule(modules.id)
      .subscribe(data => {
        this.modules.splice(this.modules.indexOf(modules), 1);
      }, err => {
        this.toastr.success('module:  ' + modules.title + ' deleted', 'Success!');
        console.log(err);
      });
  }

  onUpadate(id) {
    this.router.navigate(['/updateModule', id]);
  }
}
