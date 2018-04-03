import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FileUploadService} from '../../../service/file-upload.service';
import {RequestOptions, ResponseContentType} from '@angular/http';
import {saveAs} from 'file-saver/FileSaver';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  list;
  search;
  username;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public fileUploadService: FileUploadService) {
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

  }

  saveFile(fileName) {
    this.fileUploadService.saveFile(fileName, this.username)
      .subscribe(data => {
          saveAs(data, fileName)
          this.toastr.success('File ' + fileName + '  downloaded', 'Success!');
        },
        err => {
          console.log(err);
          this.toastr.warning('File ' + fileName + ' failed downloaded', 'Warning!');
        });
  }

  uploadAll() {
    for (const file of this.list) {
      this.saveFile(file);
    }

  }
}
