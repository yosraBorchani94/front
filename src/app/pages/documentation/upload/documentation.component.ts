import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {RequestOptions, Headers, Http, ResponseContentType} from '@angular/http';
import {FileUploadService} from '../../../service/file-upload.service';
import { saveAs } from 'file-saver/FileSaver';
import {LoginPageComponent} from '../../login/login-page.component';
import {ToastsManager} from 'ng2-toastr';

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

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private http: Http, public fileUploadService: FileUploadService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  upload(file) {
    this.fileUploadService.postFile(file, this.username).subscribe(data => {
      this.toastr.success('File ' + file.name + 'uploaded', 'Success!');
    }, error => {
      console.log(error);
      this.toastr.warning('File ' + file.name + ' failed uploaded', 'Warning!');
    });
  }
  uploadAll () {
     for (const file of this.uploader.queue) {
       this.upload(file._file);
    }
  }
}
