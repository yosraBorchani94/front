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

  getModuleFromQuiz(idQuiz) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/getModuleFromQuiz/' + idQuiz,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getModulesSorted() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/getModulesSorted',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  checkNumberOfQuestions(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/checkNumberOfQuestions/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  checkPassTheTest(idModule, username) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/checkPassTheTest/' + idModule, username,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  actifModule() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/actifModule',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  inProgressModule() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/inProgressModule',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getModuleByName(moduleName) {
    return this.http.get(this.host + '/getModuleByName/' + moduleName,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

// ******************** Question section ************************ //

  addQuestion(value) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/quiz/' + value.module.id, value,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getQuestions() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/quiz',
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  deleteQuestion(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.delete(this.host + '/quiz/' + id, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getQuestion(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/quiz/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }


  updateQuestion(idModule, idQuestion, questionName, choice1, choice2, choice3, choice4, checkbox1,
                 checkbox2, checkbox3, checkbox4, urlPicture) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.put(this.host + '/quiz/' + idModule,
      {
        'id': idQuestion, 'questionName': questionName, 'choice1': choice1, 'choice2': choice2, 'choice3': choice3, 'choice4': choice4,
        'checkbox1': checkbox1, 'checkbox2': checkbox2, 'checkbox3': checkbox3, 'checkbox4': checkbox4, 'urlPicture': urlPicture
      },
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  convertMinutes(duree) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/convertMinutes/' + duree,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getAllQuestionFromModule(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/getAllQuestionFromModule/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  addUserToModule(idModule, idUser, score) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const data = new FormData();
    data.append('idModule', idModule);
    data.append('idUser', idUser);
    data.append('score', score);
    return this.http.post(this.host + '/addUserToModule', data ,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getScore(arrayAnswers) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/calculScore', arrayAnswers,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getQuestionFromModuleShuffle(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/getQuestionFromModuleShuffle/' + id,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  /********* quiz instance *************/
  addQuizInstance(idModuleInstance, MyArrayAnswers) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/addQuizInstance/' + idModuleInstance, MyArrayAnswers,
      {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

}

