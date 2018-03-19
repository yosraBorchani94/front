import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {RequestOptions, Headers, Http, ResponseContentType} from '@angular/http';
import {FileUploadService} from '../../../service/file-upload.service';
import { saveAs } from 'file-saver/FileSaver';
import {LoginPageComponent} from '../../login/login-page.component';


@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  username;
  fileToUpload: File = null;
  uploader: FileUploader = new FileUploader({
  });
  hasBaseDropZoneOver = false;
  private options = new RequestOptions(
    { headers: new Headers({ 'Content-Type': 'application/json' }) });

  constructor(private http: Http, public fileUploadService: FileUploadService) {
  }
  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  /*uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload, this.username).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }*/

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  upload(file) {
    this.fileUploadService.postFile(file, this.username).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
  uploadAll () {
     for (const file of this.uploader.queue) {
       this.upload(file._file);
    }
  }
}
