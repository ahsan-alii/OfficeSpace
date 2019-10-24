import { Component, OnInit } from '@angular/core';
import { EmployeesComponent } from '../../employees/employees.component';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
import PNotify from 'pnotify/dist/es/PNotify';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  }
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log("Authservice is: ",this.authService)
  }
  loginUser() {
    PNotify.defaults.delay = 1000
      this.authService.loginUser(this.user).subscribe(response => {
        console.log('Response after trying to login: ', response)

        PNotify.success({
          title: 'Logged in...',
          text: 'Redirecting to employees'
        })
        this.router.navigate(['/employees', 'Islamabad'])
        console.log('Type of response received: ', typeof response)
      }, error => {
        if (error)
          console.log('Got an error: ', error.error)
        PNotify.error({
          title: 'Error',
          text: 'Invalid email or password'

        })

      });

  }

}
