import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {HttpClient} from '@angular/common/http';
import {ModuleService} from '../../service/module.service';
import {timer} from 'rxjs/observable/timer';
import {take, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {convertRuleOptions} from 'tslint/lib/configuration';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-pass-quiz',
  templateUrl: './pass-quiz.component.html',
  styleUrls: ['./pass-quiz.component.scss']
})
export class PassQuizComponent implements OnInit {
  idModule;
  idUser;
  questionList;
  username = sessionStorage.getItem('username');
  user;
  MyArrayAnswers = Array();

  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient, public toastr: ToastsManager, vcr: ViewContainerRef,
              private router: Router, public moduleService: ModuleService, public usersService: UsersService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.idModule = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {


    this.moduleService.getAllQuestionFromModule(this.idModule)
      .subscribe(data => {
        this.questionList = data;
      }, err => {
        console.log(err);
      });

    this.usersService.getUserByUsername(this.username)
      .subscribe(data => {
        this.user = data;
        this.idUser = this.user.id;
      }, err => {
        console.log(err);
      });
  }

  returnResultQuiz() {
    this.caluclScore();
    // this.insertInModuleInstance();

  }


  caluclScore() {
    console.log(this.MyArrayAnswers);
    this.moduleService.getScore(this.MyArrayAnswers)
      .subscribe(data => {
      }, err => {
        console.log(err);
      });
  }

  insertInModuleInstance() {
    this.moduleService.addUserToModule(this.idModule, this.idUser)
      .subscribe(data => {
        this.user = data;
        this.idUser = this.user.id;
      }, err => {
        console.log(err);
      });
  }

  test(value, event, id) {
    if (event.target.checked) {
      console.log('answer: ' + value + ' idQuestion: ' + id)
      this.MyArrayAnswers.push(id + ':' + value);
    } else if (!event.target.checked) {
       console.log('u unchecked  answer: ' + value + ' idQuestion: ' + id );
      this.MyArrayAnswers.splice(this.MyArrayAnswers.indexOf(id + ':' + value), 1)
    }
  }
}
