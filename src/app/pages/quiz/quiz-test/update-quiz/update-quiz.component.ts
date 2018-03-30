import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModuleService} from '../../../../service/module.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  ModuleName;
  modules;
  idQuestion;
  question;
  answersOfQuestion;
  updatedQuestion;
  tab = [];

  constructor(public activatedRoute: ActivatedRoute, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.idQuestion = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.moduleService.getModules()
      .subscribe(data => {
          this.modules = data;
        },
        err => {
          console.log(err);
        });

    this.moduleService.getQuestion(this.idQuestion)
      .subscribe(data => {
        this.question = data;
      }, err => {
        console.log(err);
      });

    this.moduleService.getAnswersOfQuestion(this.idQuestion)
      .subscribe(data => {
        this.answersOfQuestion = data;
        this.answersOfQuestion.forEach(e => {
          this.tab.push(e);
        })

      }, err => {
        console.log(err);
      });

  }

  returnToQuiz() {
    this.router.navigateByUrl('/quiz');
  }

  updateQuestion() {
    if (this.ModuleName === undefined) {
      this.toastr.warning('Enter module name', 'warning!');
    } else if (this.question.questionName === '') {
      this.toastr.warning('Enter Question name ', 'warning!');
    } else {
      this.moduleService.updateQuestion(this.question.questionName, this.ModuleName.id, this.idQuestion , this.tab)
        .subscribe(data => {
          this.updatedQuestion = data;
          this.toastr.success('Question updated', 'Success!');
          setTimeout(() => {
            this.router.navigateByUrl('/quiz');
          }, 2000);
        }, err => {
          console.log(err);
        });

    }
  }
}
