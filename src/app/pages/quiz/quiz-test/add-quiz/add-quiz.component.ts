import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../../service/module.service';
import {isQuote} from '@angular/compiler';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  modules;
  ModuleName;
  question;
  answers;
  isCorrect1 = false;
  isCorrect2 = false;
  isCorrect3 = false;
  isCorrect4 = false;
  quiz;
  isQuestion;
  isAnswer = false;

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
    console.log(value)
    /*if ((value.response1 === value.response2) || (value.response1 === value.response3) || (value.response1 === value.response4) ||
      (value.response2 === value.response1) || (value.response2 === value.response3) || (value.response2 === value.response4) ||
      (value.response3 === value.response2) || (value.response3 === value.response1) || (value.response3 === value.response4) ||
      (value.response4 === value.response2) || (value.response4 === value.response3) || (value.response4 === value.response1)) {
      this.toastr.warning('Duplicated Answer ', 'Warning !');
    } else {

      this.moduleService.duplicateQuestion(value.questionName)
        .subscribe(data => {
            this.question = data;
            this.isQuestion = this.question;
            if (this.isQuestion) {
              this.toastr.warning('Duplicated Question ', 'Warning !');
            } else {
              this.moduleService.getAnswers()
                .subscribe(data2 => {
                    this.answers = data2;
                    if (this.answers !== 0) {
                      this.answers.forEach(i => {
                          if ((i.answerName === value.response1) ||
                            (i.answerName === value.response2) ||
                            (i.answerName === value.response3) ||
                            (i.answerName === value.response4)) {
                            this.isAnswer = true;
                            this.toastr.warning('Duplicated Response ', 'Warning !');
                          }
                        },
                        err => {
                          console.log(err);
                        });
                      console.log(' isQuestion: ' + this.isQuestion + ' isAnswer: ' + this.isAnswer);
                      if ((!this.isQuestion) && (!this.isAnswer)) {
                        console.log('do');
                      }
                    } else {
                      this.isAnswer = false;
                    }
                  },
                  err => {
                    console.log(err);
                  });

            }
          },
          err => {
            console.log(err);
          });
    }*/
  }

  returnToQuiz() {
    this.router.navigateByUrl('/quiz');
  }
}
