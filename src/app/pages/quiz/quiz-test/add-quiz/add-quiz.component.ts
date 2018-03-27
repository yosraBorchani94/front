import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../../service/module.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  modules;
  ModuleName;
  isCorrect1 = false;
  isCorrect2 = false;
  isCorrect3 = false;
  isCorrect4 = false;
  quiz;
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

  onSaveQuestion(value) {
    console.log(value.questionName)
    console.log(value.module.id)
      this.moduleService.addQuiz(value)
        .subscribe((data) => {
            this.quiz = data;
            this.toastr.success('New Question created', 'Success!');
            setTimeout(() => {
             // this.router.navigateByUrl('/quiz');
            }, 2000);
          },
          err => {
            console.log(err);
          });
    }
  returnToQuiz() {
    this.router.navigateByUrl('/quiz');
  }
}
