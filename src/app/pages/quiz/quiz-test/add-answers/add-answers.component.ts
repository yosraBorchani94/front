import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModuleService} from '../../../../service/module.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-add-answers',
  templateUrl: './add-answers.component.html',
  styleUrls: ['./add-answers.component.scss']
})
export class AddAnswersComponent implements OnInit {
  questions;
  questionName;
  answers;
  isCorrect1 = false;
  isCorrect2 = false;
  isCorrect3 = false;
  isCorrect4 = false;
  idQuestion;
  question;

  constructor(public activatedRoute: ActivatedRoute, public toastr: ToastsManager,
              vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.idQuestion = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.moduleService.getQuestions()
      .subscribe(data => {
          this.questions = data;
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
  }

  onSaveAnswers(value) {
    if (value.checkbox1 === false && value.checkbox2 === false && value.checkbox3 === false && value.checkbox4 === false) {
      this.toastr.warning('choose at least one correct Answer', 'warning!');
    } else if ((value.response1 === value.response2) || (value.response1 === value.response3) || (value.response1 === value.response4) ||
      (value.response2 === value.response1) || (value.response2 === value.response3) || (value.response2 === value.response4) ||
      (value.response3 === value.response2) || (value.response3 === value.response1) || (value.response3 === value.response4) ||
      (value.response4 === value.response2) || (value.response4 === value.response3) || (value.response4 === value.response1)) {
      this.toastr.warning('Duplicated Response ', 'Warning !');
    } else { this.moduleService.addAnswers(value, this.idQuestion)
      .subscribe(data => {
          this.answers = data;
          this.toastr.success('New Answer created', 'Success!');
          setTimeout(() => {
            this.router.navigateByUrl('/quiz');
          }, 2000);
        },
        err => {
          console.log(err);
          this.toastr.warning('Duplicate Answer name ', 'warning!');
        });
    }
  }

  returnToQuiz() {
    this.router.navigateByUrl('/quiz');
  }

}
