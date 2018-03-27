import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()

export class ModuleService {
  private host: String = 'http://localhost:8081';
  private jwtToken = null;

  constructor(private http: HttpClient) {
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }

  saveModule(module) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/module', module,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getModules() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/module',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  deleteModule(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.delete(this.host + '/module/' + id, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getModule(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/module/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  updateModule(module) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.put(this.host + '/module/' + module.id, module, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  // ******************** Quiz section ************************ //

  addQuiz(value) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    console.log(value)
    return this.http.post(this.host + '/question/' + value.module.id, value,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
}
