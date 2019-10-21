import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  result;
  Url = 'http://localhost:4000'
  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post(`${this.Url}/register`, user)
  }

  loginUser(user) {
    console.log('User going to be logged in: ', user)

    // return this.http.post(`${this.loginUrl}`, user)
    this.result = this.http.post(`${this.Url}/login`, user)

    this.result.subscribe(resp => {
      console.log('Result of login service: ', resp)
      console.log('Type of result of login service: ', typeof (resp))
      if (resp === true) {
        localStorage.setItem('isLoggedIn', 'true')
        this.isLoggedIn = true;
      }
    })

    return this.result;
  }
  logoutUser() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
  }
  checkLoggedIn() {
    console.log(localStorage.getItem('isLoggedIn'))
    return localStorage.getItem('isLoggedIn');

  }
}
