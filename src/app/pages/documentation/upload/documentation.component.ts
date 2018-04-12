import {ChangeDetectionStrategy, Component, OnInit, ViewContainerRef} from '@angular/core';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {FileUploadService} from '../../../service/file-upload.service';
import {saveAs} from 'file-saver/FileSaver';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../service/module.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  username;
  ModuleName;
  module;
  modules;
  fileToUpload: File = null;
  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver = false;


  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public fileUploadService: FileUploadService, public moduleService: ModuleService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.moduleService.getModules()
      .subscribe(data => {
          this.modules = data;
        },
        err => {
          console.log(err);
        });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  upload(file) {
    if (this.ModuleName === undefined) {
      this.toastr.warning('Choose a Model ', 'Warning!');
    } else {
      this.moduleService.getModuleByName(this.ModuleName.nom)
        .subscribe(data => {
            this.module = data;
            this.fileUploadService.postFile(file, this.username, this.module.id)
              .subscribe(data1 => {
                this.toastr.success('File ' + file.name + '  uploaded', 'Success!');
              }, error => {
                console.log(error);
                if (error.status === 200) {
                  this.toastr.success('File ' + file.name + 'uploaded', 'Success!');
                } else {
                  this.toastr.warning('File ' + file.name + ' uploaded before or the file\'s size > 500KB', 'Warning!');
                }

              });
          },
          err => {
            console.log(err);
          });
    }


  }

  uploadAll() {
    for (const file of this.uploader.queue) {
      this.upload(file._file);
    }
  }
}
