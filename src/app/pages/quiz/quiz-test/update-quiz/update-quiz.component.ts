import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModuleService} from '../../../../service/module.service';
import {ToastsManager} from 'ng2-toastr';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {FileUploadService} from '../../../../service/file-upload.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  ModuleName;
  modules;
  idQuiz;
  question;
  quiz: any = '';
  updatedQuiz;
  module: any = '';
  constructor(public activatedRoute: ActivatedRoute,
              public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.idQuiz = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.moduleService.getModuleFromQuiz(this.idQuiz)
      .subscribe(data => {
          this.module = data;
        },
        err => {
          console.log(err);
        });
    this.moduleService.getModules()
      .subscribe(data => {
          this.modules = data;
        },
        err => {
          console.log(err);
        });

    this.moduleService.getQuestion(this.idQuiz)
      .subscribe(data => {
        this.quiz = data;
      }, err => {
        console.log(err);
      });
  }

  returnToQuiz() {
    this.router.navigateByUrl('/quiz');
  }

  onUpdateQuiz() {
    if (this.ModuleName === undefined) {
      this.toastr.warning('Enter module name', 'warning!');
    } else if (this.quiz.questionName === '') {
      this.toastr.warning('Enter Question name ', 'warning!');
    } else if (this.quiz.choice1 === '' || this.quiz.choice2 === '' || this.quiz.choice3 === '' || this.quiz.choice4 === '') {
      this.toastr.warning('Enter Question name ', 'warning!');
    } else if (this.quiz.checkbox1 === false && this.quiz.checkbox2 === false &&
      this.quiz.checkbox3 === false && this.quiz.checkbox4 === false) {
      this.toastr.warning('choose at least one correct Answer', 'warning!');
    } else {
      this.moduleService.updateQuestion(this.ModuleName.id, this.quiz.id, this.quiz.questionName,
        this.quiz.choice1, this.quiz.choice2, this.quiz.choice3, this.quiz.choice4,
        this.quiz.checkbox1, this.quiz.checkbox2, this.quiz.checkbox3, this.quiz.checkbox4 , this.quiz.urlPicture)
        .subscribe(data => {
          this.updatedQuiz = data;
          if (this.updatedQuiz.urlPicture === null) {
            this.toastr.success('Question updated', 'Success!');
            setTimeout(() => {
              this.router.navigateByUrl('/quiz');
            }, 2000);
          } else {
            this.router.navigate(['/addPicture/', this.quiz.id]);
          }

        }, err => {
          console.log(err);
        });
    }
  }

}
