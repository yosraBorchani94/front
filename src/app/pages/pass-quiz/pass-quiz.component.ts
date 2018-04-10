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
import {DomSanitizer} from '@angular/platform-browser';

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
  score;
  MyArrayAnswers = Array();
  module;
  countDown;
  res;
  minutesDisplay = 0;
  hoursDisplay = 0;
  secondsDisplay = 0;
  ticks = 0;
  timer;
  subscription;
  moduleInstance;
  QuizInstance;

  constructor(public sanitizer: DomSanitizer, public activatedRoute: ActivatedRoute, private http: HttpClient, public toastr: ToastsManager, vcr: ViewContainerRef,
              private router: Router, public moduleService: ModuleService, public usersService: UsersService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.idModule = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.moduleService.getQuestionFromModuleShuffle(this.idModule)
      .subscribe(data => {
        this.questionList = data;
      }, err => {
        console.log(err);
      });


    this.moduleService.getModule(this.idModule)
      .subscribe(data => {
        this.module = data;
        console.log(this.module.duree);
        this.moduleService.convertMinutes(this.module.duree)
          .subscribe(data1 => {
              this.res = data1;
              console.log(this.res)
              this.startTimer();
            },
            err => {
              console.log(err);
            });
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

  caluclScore() {
    console.log(this.MyArrayAnswers);
    this.moduleService.getScore(this.MyArrayAnswers)
      .subscribe(data => {
        this.score = data;
        this.toastr.info('your score =   ' + this.score);
        this.moduleService.addUserToModule(this.idModule, this.idUser, this.score)
          .subscribe(data1 => {
            this.moduleInstance = data1;
            /************/
            console.log(this.moduleInstance.id);
            this.moduleService.addQuizInstance(this.moduleInstance.id, this.MyArrayAnswers)
              .subscribe(data2 => {
                this.QuizInstance = data2;
              }, err => {
                console.log(err);
              });
            /***********/
            this.stopTime();
            setTimeout(() => {
              this.router.navigateByUrl('/quiz');
            }, 2000);
          }, err => {
            console.log(err);
          });
        return this.score;
      }, err => {
        console.log(err);
      });
  }


  test(value, event, id) {
    if (event.target.checked) {
      console.log('answer: ' + value + ' idQuestion: ' + id)
      this.MyArrayAnswers.push(id + ':' + value);
    } else if (!event.target.checked) {
      console.log('u unchecked  answer: ' + value + ' idQuestion: ' + id);
      this.MyArrayAnswers.splice(this.MyArrayAnswers.indexOf(id + ':' + value), 1)
    }
  }

  stopTime() {
    this.subscription.unsubscribe();
  }

  private startTimer() {
    console.log(this.res.hours + ' : ' + this.res.minutes)
    this.timer = Observable.timer(1, 1000)
    this.subscription = this.timer.subscribe(t => {
        this.ticks = t;
        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);
        if ((this.minutesDisplay === this.res.minutes) && (this.hoursDisplay === this.res.hours)) {
          this.toastr.warning('Time is up ', 'Warning!');
           this.caluclScore();
          this.stopTime();
          setTimeout(() => {
            this.router.navigateByUrl('/quiz');
          }, 2000);
        }
      }
    );
  }

  private getSeconds(ticks: number) {

    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {

    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {

    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }

}
