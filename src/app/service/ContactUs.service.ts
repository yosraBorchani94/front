import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()


export class ContactUsService {

  private host: String = 'http://localhost:8081';
  private jwtToken = null;

  constructor(private http: HttpClient) {
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }

  sendMessage(value) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/sendMessage', value ,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  getMessage () {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/getMessage' ,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});

  }
}
