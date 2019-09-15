import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { emptyScheduled } from 'rxjs/internal/observable/empty';
import {RouterModule, Routes} from '@angular/router';
import { EmployeesComponent } from '../employees/employees.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
 
  constructor() { }

  ngOnInit() {
  }

}
