import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../../service/module.service';
import {isQuote} from '@angular/compiler';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {FileUploadService} from '../../../../service/file-upload.service';


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  modules;
  ModuleName;
  question;
  quiz;
  isChecked1 = false;
  isChecked2 = false;
  isChecked3 = false;
  isChecked4 = false;

  constructor(private http: HttpClient, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService) {
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
   if (value.checkbox1 === false && value.checkbox2 === false &&
      value.checkbox3 === false && value.checkbox4 === false) {
      this.toastr.warning('choose at least one correct Answer', 'warning!');
    } else if ((value.choice1 === value.choice2) || (value.choice1 === value.choice3) || (value.choice1 === value.choice4) ||
      (value.choice2 === value.choice3) || (value.choice2 === value.choice4) || (value.choice3 === value.choice4)) {
      this.toastr.warning('Duplicated Response ', 'Warning !');
    } else if (value.module === undefined) {
      this.toastr.warning('choose a module ', 'Warning !');
    } else {
      console.log(value.checkbox1 + ' ' + value.checkbox2 + ' ' + value.checkbox3 + ' ' + value.checkbox4);
      this.moduleService.addQuestion(value)
    .subscribe((data1) => {
      this.quiz = data1;
      this.toastr.success('New Question created', 'Success!');
      setTimeout(() => {
        this.router.navigate(['/addPicture/', this.quiz.id]);
      }, 2000);
    }, err => {
      console.log(err);
      this.toastr.warning('Duplicate Question name ', 'warning!');
    });
    }
  }
  returnToQuiz() {
    this.router.navigateByUrl('/quiz');
  }


}
