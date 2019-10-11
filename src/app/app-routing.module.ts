import { NgModule } from '@angular/core';
import { Routes, RouterModule, RoutesRecognized } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'employees/Islamabad', pathMatch: 'full' },
  { path: 'employees/:branch', component: EmployeesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employeeDetail/:id', component: EmployeeDetailComponent },
  { path: 'saveEmployee/:id', component: CreateEmployeeComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
