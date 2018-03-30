import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../../service/module.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.scss']
})
export class QuizTestComponent implements OnInit {
  searchText;
  questions;
  answers;
  question;
  isClicked = false;
  closeResult: string;
  questionModal;
  answersModal;
  isAnswers;

  constructor(private modalService: NgbModal, public toastr: ToastsManager,
              vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {
    this.moduleService.getQuestions()
      .subscribe(data => {
          this.questions = data;
        },
        err => {
          console.log(err);
        });
  }

  showButtonAdd(id) {
    this.moduleService.isAnswers(id)
      .subscribe(data => {
          this.isAnswers = data;
          console.log( this.isAnswers);
        },
        err => {
          console.log(err);
        });
  }

  open(content, questionName, id) {
    this.questionModal = questionName;
    this.moduleService.getAnswersOfQuestion(id)
      .subscribe(data => {
          this.answersModal = data;
        },
        err => {
          console.log(err);
        });

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  newQuestion() {
    this.router.navigateByUrl('/addQuiz');
  }

  newAnswer(id) {
    this.router.navigate(['/addAnswer/', id]);
  }

  showAnswers(id) {
    this.moduleService.getAnswersOfQuestion(id)
      .subscribe(data => {
          this.answers = data;
          this.isClicked = true;
        },
        err => {
          console.log(err);
        });
  }

  onUpadate(id) {
    this.router.navigate(['/updateQuiz/', id]);
  }

  onDelete(question) {
    this.moduleService.deleteQuestion(question.id)
      .subscribe(data => {
        this.questions.splice(this.questions.indexOf(question), 1);
        this.toastr.success('Question:  ' + question.questionName + ' deleted', 'Success!');
      }, err => {

        console.log(err);
        this.toastr.warning('Question not deleted', 'Warning!');
      });
  }
}
