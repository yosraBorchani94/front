import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {HttpClient} from '@angular/common/http';
import {ModuleService} from '../../service/module.service';
import {timer} from 'rxjs/observable/timer';
import {take, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-pass-quiz',
  templateUrl: './pass-quiz.component.html',
  styleUrls: ['./pass-quiz.component.scss']
})
export class PassQuizComponent implements OnInit {
  idModule;
  idquestions;
  questionList: Array<any> = [];


  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient, public toastr: ToastsManager, vcr: ViewContainerRef,
              private router: Router, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.idModule = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {


    this.moduleService.getAllQuestionFromModule(this.idModule)
      .subscribe(data => {
        this.idquestions = data;
        this.idquestions.forEach(id => {
          this.getQuestion(id);
        }, err => {
          console.log(err);
        });
        console.log('questionList ', this.questionList, 'size ', this.questionList.length);
      }, err => {
        console.log(err);
      });
  }

  getQuestion(id) {
    this.moduleService.getQuestion(id)
      .subscribe(data => {
        this.questionList.push(data);
      }, err => {
        console.log(err);
      });
  }

}
