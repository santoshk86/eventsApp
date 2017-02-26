import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  currentUser: IUser

  constructor(private http: Http) {

  }
  loginUser(userName: string, password: string) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let loginInfo = { username: userName, password: password }

    /*
    return this.http.post('/api/login', JSON.stringify(loginInfo), options)
      .do(resp => {
        if (resp) {
          this.currentUser = <IUser>resp.json().user;
        }
      }).catch(error => {
        return Observable.of(false);
      })*/

    this.currentUser = {  // for dev testing only, until you not create node server for login the user.
      id: Math.random(),
      userName: userName,
      firstName: 'John',
      lastName: 'Papa'
    }
    return Observable.of(true);
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    return this.http.get('/api/currentIdentity').map((response: any) => {
      if (response._body) {
        return response.json();
      } else {
        return {}
      }
    })
      .do(currentUser => {
        if (!!currentUser.userName) {
          this.currentUser = currentUser;
        }
      })
      .subscribe();
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName
    this.currentUser.lastName = lastName

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options);
  }

  logout() {
    this.currentUser = undefined;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/logout', JSON.stringify({}), options);
  }
}