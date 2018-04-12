import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class FileUploadService {
  private jwtToken = null;

  constructor(private httpClient: HttpClient) {
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }

  postFile(fileToUpload: File, username: String, idModule) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const url = 'http://localhost:8081/uploadfile/' + username;
    const data = new FormData();
    data.append('uploadfile', fileToUpload);
    data.append('idModule', idModule);
    return this.httpClient.post(url, data, {headers: new HttpHeaders({'Authorization': this.jwtToken})})
  }

  postImage(fileToUpload: File, id: number) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const url = 'http://localhost:8081/uploadPicture/' + id;
    const data = new FormData();
    data.append('uploadfile', fileToUpload);
    return this.httpClient.post(url, data, {headers: new HttpHeaders({'Authorization': this.jwtToken})})
  }

  getFiles(username) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.httpClient.get('http://localhost:8081/getallfiles/' + username,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }


  downloadUserFile(fileName, username) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.httpClient.get('http://localhost:8081/download/' + username + '/' + fileName,
      {headers: new HttpHeaders({'Authorization': this.jwtToken}), responseType: 'blob'})
  }

  downloadAllFiles(e) {
    return this.httpClient.post('http://localhost:8081/downloadAllFiles', e,
      {headers: new HttpHeaders({'Authorization': this.jwtToken}), responseType: 'blob'})
  }

  downloadFile(fileName) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.httpClient.post('http://localhost:8081/downloadFile', fileName,
      {headers: new HttpHeaders({'Authorization': this.jwtToken}), responseType: 'blob'})
  }

  getDocumentsByModuleByUser(id, username) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.httpClient.post('http://localhost:8081/getDocumentsByModuleByUser/' + id, username,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getDocumentsByModule(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.httpClient.get('http://localhost:8081/getDocumentsByModule/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getDocuments() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.httpClient.get('http://localhost:8081/document',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  deleteUserFile(fileName) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.httpClient.delete('http://localhost:8081/deleteUserFile/' + fileName,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  findDocumentByName(fileName) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.httpClient.post('http://localhost:8081/findDocumentByName', fileName,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getDocumentsByUser(username) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.httpClient.post('http://localhost:8081/findDocumentByUseName', username,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

}
