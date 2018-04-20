import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../../service/users.service';
import {ToastsManager} from 'ng2-toastr';
import {GoogleApiService, GoogleAuthService} from 'ng-gapi';
import {UserService} from '../../../service/UserService';
import {EventService} from '../../../service/EventService';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  users;
  listUser;
  test;
  today = Date.now();
  public sheetId: string;
  public sheet: any;
  public foundSheet: any;
  auth;

  constructor(private userService: UserService,
              private authService: GoogleAuthService,
              private gapiService: GoogleApiService, public eventService: EventService, public toastr: ToastsManager, vcr: ViewContainerRef, public usersService: UsersService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.gapiService.onLoad().subscribe();
  }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(data => {
          this.listUser = data;
        },
        err => {
          console.log(err);
        });

  }

  returnToCalendar() {
    this.router.navigateByUrl('/events');
  }

  onSaveEvent(event) {
    if (event.startDate < this.today || event.endDate < this.today) {
      this.toastr.warning('Please enter a correct date', 'Warning!');
    } else if (event.startDate > event.endDate) {
      this.toastr.warning('Please enter a correct date', 'Warning!');
    } else {
      this.usersService.saveEvent(event)
        .subscribe((data) => {
            this.test = data;
            if (this.test === 1) {
              this.toastr.success('event ' + this.test.title + ' Created', 'Success!');
              setTimeout(() => {
                this.router.navigateByUrl('/events');
              }, 1000);
            } else {
              this.toastr.warning('event not created', 'Warning!');
            }
          },
          err => {
            console.log(err);
          });
    }
  }


  signOut () {
    this.userService.signOut();
  }

  public isLoggedIn(): boolean {
    return this.userService.isUserSignedIn();
  }

  public signIn() {
    this.userService.signIn();
  }



}
