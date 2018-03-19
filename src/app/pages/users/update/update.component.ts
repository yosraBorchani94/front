import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../../service/users.service';
import {User} from '../../../modele/model.user';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  user;
  idUser: number;
  roles;
  roleName;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public activatedRoute: ActivatedRoute, public usersService: UsersService, public router: Router) {
    this.idUser = activatedRoute.snapshot.params['id'];
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.usersService.getRoles()
      .subscribe(data => {
          this.roles = data;
        },
        err => {
          console.log(err);
        });
    this.usersService.getUser(this.idUser)
      .subscribe(data => {
        this.user = data;
        console.log(this.user)
      }, err => {
        console.log(err);
      });
  }

  updateUser() {
    if (this.user.password === this.user.repassword) {
      this.toastr.success('User updated', 'Success!');
      this.usersService.updateUser(this.user)
      .subscribe(resp => {
          this.user = resp;
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 1000);
        },
        err => {
          console.log('err' + err);
          console.log(this.user);
        });
    } else {
      this.toastr.error('Not matching password/repassword', 'Error');
    }
  }

  OnCancel() {
    this.router.navigateByUrl('/users');
  }
}
