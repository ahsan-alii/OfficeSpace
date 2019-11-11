import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from '../employee';
import PNotify from 'pnotify/dist/es/PNotify';
import { ActivatedRoute, Router, Event, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  selectedbranch = '';
  ReceivedData: any;
  showTable = false;
  inputValue = '';
  //config: any;
  config = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 0
  };
  idToDelete: any;
  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {

        // console.log("Router is: ", this.router)
        // console.log('Event of Navigation End');
        // console.log('Params of this route: ', this.route.snapshot.params);
        let branch = this.route.snapshot.params['branch'];
        this.selectedbranch = branch
        console.log('branch: ', this.selectedbranch)
        this.data.getEmployees().subscribe((data: Employee[]) => {
          //   console.log('Data: ', data);
          this.ReceivedData = data;
          this.config.totalItems = data.length;
        });
      }
    })
  }
  ngOnInit() {

  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  deleteEmployee() {
    //console.log('ID to delete: ', this.idToDelete)
    //var result = confirm('Are you sure to delete ?')
    //this.idToDelete = 32;
    this.data.deleteEmployee(this.idToDelete).subscribe(() => {
      console.log('Deleted')
      PNotify.defaults.delay = 1500
      PNotify.success({
        title: 'Successfully deleted',
        // text: 'Redirecting to employees'
      })
      // alert('Deleted');
    });

  }
  filter() {

    let inputValueUpperCased = this.inputValue.toUpperCase();
    console.log(this.inputValue);
    let data = document.getElementsByTagName('tr');
     console.log('Data is: ', data);
    // console.log('length of data: ', data.length)
    // console.log('Data Text Content: ', data[2].textContent)
    for (let i = 1; i < data.length; i++) {
      if (data[i].textContent.toUpperCase().indexOf(inputValueUpperCased) > -1)
        data[i].style.display = ""
      else
        data[i].style.display = "none"
    }
  }

  showList: boolean = false;
  Hide() {
    this.showList = false;
  }
  Show() {
    this.showList = true;
  }
  listView() {
    this.showTable = true;
  }
  cardView() {
    this.showTable = false;
  }
}