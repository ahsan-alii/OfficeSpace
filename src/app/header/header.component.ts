import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import PNotify from 'pnotify/dist/es/PNotify';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  logOut() {
    console.log('User logging out...')
    this.authService.logoutUser();
    // this.router.navigate(['/login'])
    PNotify.defaults.delay = 2000
    PNotify.success({
      title: 'Logged Out...',
      text: 'Redirecting to login page'
    })
  }

}
