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
  user: any = '';
  idUser: number;
  roles;
  roleName;
  roleValue;
  username = sessionStorage.getItem('username');
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public activatedRoute: ActivatedRoute,
              public usersService: UsersService, public router: Router) {
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
        this.roleName = this.user.roles[0].roleName;
      }, err => {
        console.log(err);
      });
  }

  updateUser() {
    if (this.user.password === this.user.repassword) {
       this.usersService.updateUser(this.user)
         .subscribe(resp => {
             this.user = resp;
             this.toastr.success('User updated', 'Success!');
             if (this.user.username === this.username ) {
               setTimeout(() => {
                 this.router.navigate(['/login']);
               }, 2000);
             }
           },
           err => {
             console.log('err' + err);
             this.toastr.error('Updated Fail', 'Error');
           });
     } else {
       this.toastr.error('Not matching password/repassword', 'Error');
     }
  }

  OnCancel() {
    this.router.navigateByUrl('/users');
  }


  changeRole() {
    this.usersService.findByRoleName(this.roleName)
      .subscribe(resp => {
          this.roleValue = resp;
          this.user.roles[0] = this.roleValue;
          // console.log('role : ' , this.user.roles);
        },
        err => {
          console.log('err' + err);
        });


  }
}
