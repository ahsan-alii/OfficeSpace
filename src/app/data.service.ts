import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, isEmpty, map } from 'rxjs/operators';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }
  uri = 'http://localhost:4000/Employees';
  data: Employee[];

  addEmployee(empObj: Employee) {
    this.http.post(`${this.uri}`, empObj).subscribe(res => { console.log('Employee Added') })
    alert('Done adding data');
  }

  getEmployees() {

    return this.http.get(`${this.uri}`)
  }
  getEmployee(_id: number): any {
    //console.log(this.http.post);
    return this.http.post(`${this.uri}/get`, { id: _id })
  }
  deleteEmployee(_id: number) {
    return this.http.post(`${this.uri}/del`, { id: _id })
  }
  updateEmployee(empObj: Employee) {

    return this.http.post(`${this.uri}/update`, empObj)
  }
  searchEmployee(searchFor: string, searchUsing: string) {
    return this.http.post(`${this.uri}/search`, { searchFor: searchFor, searchUsing: searchUsing })
  }
  getEmployeeIds() {
    return this.http.get(`${this.uri}/ids`)
  }

}
