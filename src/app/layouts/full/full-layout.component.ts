import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModuleService} from '../../service/module.service';
import {UsersService} from '../../service/users.service';
import {VideoService} from '../../service/video.service';
import {FileUploadService} from '../../service/file-upload.service';
import {ToastsManager} from 'ng2-toastr';
import {EventService} from '../../service/EventService';
import {TranslateService} from 'ng2-translate';
import {Router} from '@angular/router';
import {ContactUsService} from '../../service/ContactUs.service';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements OnInit {
  modules: any = '';
  users: any = '';
  messages: any = '';
  videos: any = '';
  documents: any = '';
  NonAcceptedDocuments: any = '';
  username = sessionStorage.getItem('username');
  roleSession = sessionStorage.getItem('role');
  moduleScoreByUser;
  moduleScoreAllUser;
  events: any = '';

  constructor( public contactUsService: ContactUsService , private router: Router , private translate: TranslateService, public eventService: EventService, public toastr: ToastsManager, vcr: ViewContainerRef, public fileUploadService: FileUploadService, public videoService: VideoService, public moduleService: ModuleService, public usersService: UsersService) {
    this.toastr.setRootViewContainerRef(vcr);
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

  }


  changeLanguage(lang) {
    this.translate.use(lang);
  }
  ngOnInit() {
    if (this.username === null) {
      this.router.navigateByUrl('/login');
    } else {
      this.moduleService.getModules()
        .subscribe(data => {
            this.modules = data;
          },
          err => {
            console.log(err);
          });

      this.moduleService.getScoreModuleByUser(this.username)
        .subscribe(data => {
            this.moduleScoreByUser = data;
          },
          err => {
            console.log(err);
          });
      this.moduleService.getScoreModuleAllUser()
        .subscribe(data => {
            this.moduleScoreAllUser = data;
          },
          err => {
            console.log(err);
          });
      this.fileUploadService.getNonAcceptedDocuments()
        .subscribe(data => {
            this.NonAcceptedDocuments = data;
          },
          err => {
            console.log(err);
          });

      this.usersService.getUsers()
        .subscribe(data => {
            this.users = data;
          },
          err => {
            console.log(err);
          });

      this.videoService.getVideos()
        .subscribe(data => {
            this.videos = data;
          },
          err => {
            console.log(err);
          });
      this.fileUploadService.getDocuments()
        .subscribe(data => {
            this.documents = data;
          },
          err => {
            console.log(err);
          });

      this.eventService.getEvents()
        .subscribe(data => {
            this.events = data;
          },
          err => {
            console.log(err);
          });
    }

    this.contactUsService.getMessage()
      .subscribe(data => {
          this.messages = data;
        },
        err => {
          console.log(err);
        });
  }

  AcceptDocument(document) {
    this.fileUploadService.AcceptDocument(document)
      .subscribe(data => {
        this.NonAcceptedDocuments.splice(this.NonAcceptedDocuments.indexOf(document), 1);
        this.toastr.success('Document ' + document.documentName + ' added ', 'Success!');
        setTimeout(() => {
          this.ngOnInit();
        }, 1000);
      }, err => {

        console.log(err);
        this.toastr.warning('Document not added', 'Warning!');
      });


  }

  RefuseDocument(document) {
    this.fileUploadService.RefuseDocument(document)
      .subscribe(data => {
        this.NonAcceptedDocuments.splice(this.NonAcceptedDocuments.indexOf(document), 1);
        this.toastr.success('Document ' + document.documentName + ' deleted ', 'Success!');
        setTimeout(() => {
          this.ngOnInit();
        }, 1000);
      }, err => {

        console.log(err);
        this.toastr.warning('Document not deleted', 'Warning!');
      });

  }

}
