import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import PNotify from 'pnotify/dist/es/PNotify';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user = {}
  constructor(private router: Router,
    private authService: AuthService) {
    if (authService.isLoggedIn == true) {
      this.router.navigate(['/employees', 'Islamabad'])
      PNotify.defaults.delay = 2000;
      PNotify.error({
        title: 'Already Logged In',
        text: 'Log out to make a new registration'

      })
    }
  }

  ngOnInit() {
  }
  registerUser() {
    this.authService.registerUser(this.user).subscribe(resp => {
      console.log('Response after registering user: ', resp)
    })
  }
}
