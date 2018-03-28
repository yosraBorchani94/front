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

  // ******************** Question section ************************ //

  addQuiz(value) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/question/' + value.module.id, value,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getQuestions() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/question',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getAnswersOfQuestion(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/answersOfQuestion/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  deleteQuestion(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.delete(this.host + '/question/' + id, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  duplicateQuestion(name) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/duplicateQuestion/' + name,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getQuestion(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/question/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  updateQuestion(id, tab1, tab2, tab3, tab4, questionName, isCorrect1, isCorrect2, isCorrect3, isCorrect4, ModuleName) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.put(this.host + '/updateQuestion/' + id, {
        'questionName': questionName, 'module': ModuleName, 'checkbox1': isCorrect1, 'checkbox2': isCorrect2,
        'checkbox3': isCorrect3, 'isCorrect4': isCorrect4, 'response1': tab1, 'response2': tab2, 'response3': tab3, 'response4': tab4,
      },
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }


  // ******************** Answers section ************************ //
  getAnswers() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/answer',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  checkedAnswer1(answer) {
    return this.http.get(this.host + '/checkedAnwer/' + answer,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }


}
