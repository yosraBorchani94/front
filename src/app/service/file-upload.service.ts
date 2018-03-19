import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class FileUploadService {
  private jwtToken = null;
  constructor(private httpClient: HttpClient)  {
  }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }
  postFile(fileToUpload: File , username: String) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const url = 'http://localhost:8081/uploadfile/' + username;
    const data = new FormData();
    data.append('uploadfile', fileToUpload );
    return this.httpClient.post(url, data , {headers: new HttpHeaders({'Authorization' : this.jwtToken })})
  }

  getFiles(username) {
      if (this.jwtToken == null) {
        this.loadToken();
      }
      return this.httpClient.get( 'http://localhost:8081/getallfiles/' + username ,
        {headers: new HttpHeaders({'Authorization' : this.jwtToken })});
  }


 saveFile (fileName , username) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.httpClient.get( 'http://localhost:8081/download/' + username + '/' + fileName,
      {headers: new HttpHeaders({'Authorization' : this.jwtToken }) , responseType: 'blob'})
  }
}
