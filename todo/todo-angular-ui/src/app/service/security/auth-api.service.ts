import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BasicAuthService } from './basic-auth.service';
import {map} from 'rxjs/operators'
import { API_HOST } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  constructor(
    private httpClient: HttpClient
  ) { }

  doJwtAuth(username, password) {
    return this.httpClient.post<any>(`${API_HOST}/authenticate`, {username, password})
      .pipe(
        map(
          data => {
            sessionStorage.setItem('authenticatedUser', username)
            sessionStorage.setItem('token', `Bearer ${data.token}`)
            return data
          }
        )
      )
  }

  doBasicAuth(username, password) {
    let basicAuthString = 'Basic ' +window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicAuthString
    })

    return this.httpClient.get<BasicAuthBean>(`${API_HOST}/basicauth`, {headers})
      .pipe(
        map(
          data => {
            sessionStorage.setItem('authenticatedUser', username)
            sessionStorage.setItem('token', basicAuthString)
            return data
          }
        )
      )
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticatedUser')
  }

  getAuthenticatedToken() {
    return sessionStorage.getItem('token')
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser')
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser')
    sessionStorage.removeItem('token')
  }
}



export class BasicAuthBean{
  constructor(
    message : string
  ){}
}