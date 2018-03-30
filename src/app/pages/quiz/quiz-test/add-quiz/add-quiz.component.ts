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
    this.moduleService.addQuestion(value)
      .subscribe((data1) => {
        this.quiz = data1;
        this.toastr.success('New Question created', 'Success!');
        setTimeout(() => {
          this.router.navigateByUrl('/quiz');
        }, 2000);
      }, err => {
        console.log(err);
        this.toastr.warning('Duplicate Question name ', 'warning!');
      });
  }

  returnToQuiz() {
    this.router.navigateByUrl('/quiz');
  }
}
