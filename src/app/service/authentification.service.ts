import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  private host: String = 'http://localhost:8081';
  private jwtToken = null;
  private roles: Array<any>;

  constructor(private http: HttpClient) {
  }

  login(user) {
    return this.http.post(this.host + '/login', user, {observe: 'response'});
  }

  register(user) {
    return this.http.post(this.host + '/register', user,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  saveToken(jwt) {
    this.jwtToken = jwt;
    localStorage.setItem('token', jwt);
    const jwtHelper = new JwtHelper;
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.jwtToken = null;
  }

  isAdmin() {
    for (const r of this.roles) {
      if (r.authority === 'ADMIN ROLE') {
        return true;
      }
    }
    return false;
  }

  returnRole() {
    for (const r of this.roles) {
      return r.authority;
    }
  }

  isUSERROLE() {
    for (const r of this.roles) {
      if (r.authority === 'USER ROLE') {
        console.log(r.authority);
        return true;
      }
    }
    return false;
  }

}
