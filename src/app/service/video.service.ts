import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()

export class VideoService {
  private host: String = 'http://localhost:8081';
  private jwtToken = null;

  constructor(private http: HttpClient) {
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }

  register(video) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/video', video,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getVideos() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/video',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getVideo(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/video/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  deleteVideo(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.delete(this.host + '/video/' + id, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  updateVideo (video) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.put(this.host + '/video/' + video.id, video, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

}
