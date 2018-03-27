import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {EventService} from '../../../../service/EventService';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.scss']
})
export class QuizTestComponent implements OnInit {

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public eventService: EventService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  newQuestion(){
    this.router.navigateByUrl('/addQuiz');
  }
}
