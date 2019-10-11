import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  result;
  loginUrl = 'http://localhost:4000/login'
  constructor(private http: HttpClient) { }

  loginUser(user) {
    console.log('User going to be logged in: ', user)

    // return this.http.post(`${this.loginUrl}`, user)
    this.result = this.http.post(`${this.loginUrl}`, user)

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
  }
}
