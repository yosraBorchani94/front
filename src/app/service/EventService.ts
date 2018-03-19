import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class EventService {
  private host: String = 'http://localhost:8081';
  private jwtToken = null;

  constructor(private http: HttpClient) {
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }

  getEvents() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/event',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getEventFromAcceptedEvent(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/accpetedEvent/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  deleteEvent(id) {
    return this.http.delete(this.host + '/event/' + id, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  deleteEventFromAccpetedUsers(id) {
    console.log('deleteEventFromAccpetedUsers ' + id)
    return this.http.delete(this.host + '/acceptedUsers/' + id, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  updateEvent(event) {
    return this.http.put(this.host + '/event/' + event.id, event, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getEvent(id) {
    return this.http.get(this.host + '/event/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  participate(value) {
    return this.http.post(this.host + '/acceptedUsers/', value,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  accpetedEvent(value) {
    return this.http.post(this.host + '/accpetedEvent', value,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
}
