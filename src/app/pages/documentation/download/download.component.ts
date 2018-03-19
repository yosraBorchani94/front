import { Component, OnInit } from '@angular/core';
import {FileUploadService} from '../../../service/file-upload.service';
import {RequestOptions, ResponseContentType} from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
list;
search;
username;
  constructor( public fileUploadService: FileUploadService) { }

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
        },
        err => {
          console.log(err);
        });
  }
  uploadAll() {
    for (const file of this.list) {
      console.log(file)
      this.saveFile(file);
    }
  }
}
