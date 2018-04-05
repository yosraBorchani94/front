import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../service/module.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss']
})
export class ListQuizComponent implements OnInit {

  modules;
  searchText;
  idModule;
  questionsFromModule;
  constructor(public activatedRoute: ActivatedRoute, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService) {
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

  PassTheTest(id) {
    this.router.navigate(['/passQuiz', id]);
  }

  // isActive(id) {
  //   this.moduleService.getAllQuestionFromModule(id)
  //     .subscribe(data => {
  //         this.questionsFromModule = data;
  //         console.log( this.questionsFromModule)
  //       return true;
  //       },
  //       err => {
  //         console.log(err);
  //         return false;
  //       });
  // }

}
