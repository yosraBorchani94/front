import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {ModuleService} from '../../../../service/module.service';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {FileUploadService} from '../../../../service/file-upload.service';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.scss']
})
export class AddPictureComponent implements OnInit {

  quiz: any = '';
  idQuiz;
  hasBaseDropZoneOver = false;
  fileToUpload: File = null;
  uploader: FileUploader = new FileUploader({queueLimit: 1});
  allowedMimeTypes: string[] = ['image/png', 'image/jpeg', 'image/gif'];
  urlPicture: File;

  constructor(public activatedRoute: ActivatedRoute, public toastr: ToastsManager,
              vcr: ViewContainerRef, private router: Router, public moduleService: ModuleService,
              public fileUploadService: FileUploadService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.idQuiz = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.moduleService.getQuestion(this.idQuiz)
      .subscribe(data => {
        this.quiz = data;
      }, err => {
        console.log(err);
      });
  }

  handleFileInput(files: FileList) {
    this.uploader.onAfterAddingFile = f => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      } else {
        this.fileToUpload = files.item(0);
      }
    };
  }

  fileOverBase(e: any): void {
    if (this.uploader.isUploading) {
      this.uploader.setOptions({allowedMimeType: []});
    } else {
      this.uploader.setOptions({allowedMimeType: this.allowedMimeTypes});
      this.hasBaseDropZoneOver = e;
    }
  }

  returnToQuiz() {
    this.router.navigateByUrl('/quiz');
  }


  upload(file) {
    this.fileUploadService.postImage(file, this.idQuiz).subscribe(data => {
      this.toastr.success('File uploaded', 'Success!');
      setTimeout(() => {
        this.router.navigateByUrl('/quiz');
      }, 2000);
    }, error => {
      if (error.status === 200) {
        this.toastr.success('File uploaded', 'Success!');
        setTimeout(() => {
          this.router.navigateByUrl('/quiz');
        }, 2000);
      } else {
        console.log(error);
        this.toastr.warning('Fail to upload file', 'Worning!');
      }

    });
  }
}
