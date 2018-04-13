import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FileUploadService} from '../../../service/file-upload.service';
import {RequestOptions, ResponseContentType} from '@angular/http';
import {saveAs} from 'file-saver/FileSaver';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../service/module.service';
import {CONFIG_FILENAME} from 'tslint/lib/configuration';
import {Router} from '@angular/router';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  list;
  search;
  username;
  modules;
  documentsByModuleByUser: any = '';
  documentsByModule: any = '';
  documents: any = '';
  document;
  documentsList: any = '';
  documentsListByUser: any = '';

  constructor(private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef, public fileUploadService: FileUploadService, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.fileUploadService.getFiles(this.username)
      .subscribe(data => {
          this.list = data;
        },
        err => {
          console.log(err);
        });
    this.fileUploadService.getDocuments()
      .subscribe(data => {
          this.documentsList = data;
        },
        err => {
          console.log(err);
        });

    this.fileUploadService.getDocumentsByUser(this.username)
      .subscribe(data => {
          this.documentsListByUser = data;
        },
        err => {
          console.log(err);
        });


    this.moduleService.getModules()
      .subscribe(data => {
          this.modules = data;
        },
        err => {
          console.log(err);
        });
  }

  downloadUserFile(fileName) {
    this.fileUploadService.downloadUserFile(fileName, this.username)
      .subscribe(data => {
          saveAs(data, fileName)
          this.toastr.success('File ' + fileName + '  downloaded', 'Success!');
        },
        err => {
          console.log(err);
          this.toastr.warning('File ' + fileName + ' failed downloaded', 'Warning!');
        });
  }

  DownloadAllByUser() {
    this.documentsByModuleByUser.forEach(e => {
      this.downloadUserFile(e);
    })
  }

  DeletedAllByUser() {
    this.documentsByModuleByUser.forEach(e => {
      this.deleteUserFile(e);
    })
  }

  downloadFile(fileName) {
    this.fileUploadService.downloadFile(fileName)
      .subscribe(data => {
          saveAs(data, fileName)
          this.toastr.success('File ' + fileName + '  downloaded', 'Success!');
        },
        err => {
          console.log(err);
          this.toastr.warning('File ' + fileName + ' failed downloaded', 'Warning!');
        });
  }

  DownloadAllByModule() {
    this.fileUploadService.getDocuments()
      .subscribe(data => {
          this.documents = data;
          this.documents.forEach(e => {
            this.downloadFile(e.documentName);
          })
        },
        err => {
          console.log(err);
        });
  }


  sendIdModule(id) {
    this.fileUploadService.getDocumentsByModuleByUser(id, this.username)
      .subscribe(data => {
          this.documentsByModuleByUser = data;
        },
        err => {
          console.log(err);
        });
  }

  sendIdModule2(id) {
    this.fileUploadService.getDocumentsByModule(id)
      .subscribe(data => {
          this.documentsByModule = data;
        },
        err => {
          console.log(err);
        });
  }

  deleteFile(fileName) {

    this.fileUploadService.findDocumentByName(fileName)
      .subscribe(data => {
          this.document = data;
          this.fileUploadService.deleteUserFile(this.document.id)
            .subscribe(data1 => {
                this.documentsByModule.splice(this.documentsByModule.indexOf(fileName), 1);
                this.toastr.success('Document  ' + fileName + '  deleted', 'Success!');
              },
              err => {
                console.log(err);
              });
        },
        err => {
          console.log(err);
        });
  }

  DeletedAllByModule() {
    this.fileUploadService.getDocuments()
      .subscribe(data => {
          this.documents = data;
          this.documents.forEach(e => {
            this.deleteUserFile(e.documentName);
          })
        },
        err => {
          console.log(err);
        });
  }


  deleteUserFile(fileName) {

    this.fileUploadService.findDocumentByName(fileName)
      .subscribe(data => {
          this.document = data;
          // console.log(this.document.id)
          this.fileUploadService.deleteUserFile(this.document.id)
            .subscribe(data1 => {
                this.documentsByModuleByUser.splice(this.documentsByModuleByUser.indexOf(fileName), 1);
                this.toastr.success('Document  ' + fileName + '  deleted', 'Success!');
              },
              err => {
                console.log(err);
              });
        },
        err => {
          console.log(err);
        });
  }

  // DeletedAllByUser() {
  //   this.fileUploadService.getDocumentsByUser(this.username)
  //     .subscribe(data => {
  //         this.documents = data;
  //         this.documents.forEach(e => {
  //           this.deleteUserFile(e.documentName);
  //         })
  //       },
  //       err => {
  //         console.log(err);
  //       });
  // }
}
