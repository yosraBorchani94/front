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
  tabAnswer = [];
  isCorrect1;
  isCorrect2;
  isCorrect3;
  isCorrect4;
  updatedQuestion;

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
            this.tabAnswer.push(e.answerName);
          })
          this.moduleService.checkedAnswer1(this.tabAnswer[0])
            .subscribe(data1 => {
                this.isCorrect1 = data1;
              }
              ,
              err => {
                console.log(err);
              });
          this.moduleService.checkedAnswer1(this.tabAnswer[1])
            .subscribe(data2 => {
                this.isCorrect2 = data2;

              }
              ,
              err => {
                console.log(err);
              });
          this.moduleService.checkedAnswer1(this.tabAnswer[2])
            .subscribe(data3 => {
                this.isCorrect3 = data3;

              }
              ,
              err => {
                console.log(err);
              });
          this.moduleService.checkedAnswer1(this.tabAnswer[3])
            .subscribe(data4 => {
                this.isCorrect4 = data4;

              }
              ,
              err => {
                console.log(err);
              });
        }
        ,
        err => {
          console.log(err);
        });


  }

  returnToQuiz() {
    this.router.navigateByUrl('/quiz');
  }

  updateQuestion() {
    console.log(this.tabAnswer[0]);
    console.log(this.tabAnswer[1]);
    console.log(this.tabAnswer[2]);
    console.log(this.tabAnswer[3]);
    console.log(this.question.questionName);
    console.log(this.isCorrect1 + ' ' + this.isCorrect2 + ' ' + this.isCorrect3 + ' ' + this.isCorrect4);
    console.log(this.ModuleName);
    this.moduleService.updateQuestion( this.idQuestion, this.tabAnswer[0], this.tabAnswer[1], this.tabAnswer[2], this.tabAnswer[3],
      this.question.questionName, this.isCorrect1, this.isCorrect2, this.isCorrect3, this.isCorrect4, this.ModuleName)
      .subscribe(data => {
        this.updatedQuestion = data;
      }, err => {
        console.log(err);
      });
  }


}
