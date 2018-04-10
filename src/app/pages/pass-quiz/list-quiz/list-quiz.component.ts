import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../service/module.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss']
})
export class ListQuizComponent implements OnInit {

  modules;
  searchText;
  username = sessionStorage.getItem('username');
  rslt;

  constructor(public activatedRoute: ActivatedRoute, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.moduleService.getModulesSorted()
      .subscribe(data => {
          this.modules = data;
        },
        err => {
          console.log(err);
        });
  }

  PassTheTest(id) {
    this.moduleService.checkPassTheTest(id, this.username)
      .subscribe(data => {
          this.rslt = data;
          console.log(this.rslt)
          if (this.rslt === 0) {
            this.toastr.success('You have already passed this Quiz , check out the next level ', 'Success!');
          } else if (this.rslt === 1) {
            this.toastr.info('you did not succeed this Quiz whoud you like to to try again', 'Information!');
          } else if (this.rslt === 2) {
            this.toastr.success('You succeded the precedent exam u can take this level now', 'Success!');
          } else if (this.rslt === 3) {
            this.toastr.warning('You need to pass the precedent Module before taking this exam ', 'Warning!');
          } else {
            this.toastr.info('this is your first time taking this exam ', 'Warning!');
          }
        },
        err => {
          console.log(err);
        });
    // this.router.navigate(['/passQuiz', id]);
  }
}
