import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user = {}
  constructor(private authService: AuthService) { 

  }

  ngOnInit() {
  }
  registerUser() {
    this.authService.registerUser(this.user).subscribe(resp => {
      console.log('Response after registering user: ', resp)
    })
  }
}
