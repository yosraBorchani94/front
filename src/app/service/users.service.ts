import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  private host: String = 'http://localhost:8081';
  private jwtToken = null;
  private roles: Array<any>;

  constructor(private http: HttpClient) {
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }

  getUsers() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/users',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  isAdmin() {
    for (const r of this.roles) {
      if (r.authority === 'ADMIN ROLE') {
        return true;
      }
    }
    return false;
  }

  register(user) {
    return this.http.post(this.host + '/register', user,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getRoles() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/roles',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getUser(id) {
    return this.http.get(this.host + '/users/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  updateUser(user) {
    return this.http.put(this.host + '/users/' + user.id, user, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  deleteUser(id) {
    // console.log('id: ' + id);
    return this.http.delete(this.host + '/users/' + id, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  forgotPassword(v) {

    return this.http.post(this.host + '/forgotPassword ', {'username': v},
      {headers: new HttpHeaders({'Authorization': this.jwtToken})}).map(data => console.log(data));
  }

  saveEvent(event) {
    // console.log(event);
    return this.http.post(this.host + '/event', event,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
}
