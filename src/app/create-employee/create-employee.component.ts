import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Routes, ActivatedRoute } from '@angular/router'
import { Employee } from '../employee';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {
  x: number;
  y: number;
  _id = this.route.snapshot.params['id'];
  empObj = {
    //_id: this._id,
    first_name: '',
    last_name: '',
    title: '',
    department: '',
    email: '',
    gender: '',
    location: '',
    phone: '',
    branch: '',
    positionX: this.x,
    positionY: this.y,
  }
  canvas: any = '';
  ctx: any = '';
  newEmployee: boolean = false; //Check if the request is to save a new employee or Update employee
  employee: Employee
  constructor(private dataService: DataService, private route: ActivatedRoute, private location: Location) {
  }

  addEmployee() {
    this.dataService.addEmployee(this.empObj);
    console.log('Details of employee are: ', this.empObj)
  }
  modifyEmployee() {
    this.dataService.updateEmployee(this.empObj).subscribe(() => {
      console.log('Employee Updated');
    });
  }

  ngOnInit() {
    this.canvas = document.getElementById('myCanvas');
    this.canvas.width = 960
    this.canvas.height = 630
    this.ctx = this.canvas.getContext('2d');

    // let _id = this.route.snapshot.params['id'];
    // if (_id == 'save') this.newEmployee = true;

    this.route.params.subscribe(params=>{
      console.log('dddddddddddddddddddddddd', params.id);
      if(params.id == 'save'){
        this.newEmployee=true;
        this.resetAll();
      } else {
        this.newEmployee=false;
        this.employee = this.dataService.getEmployee(params.id).subscribe((person) => {
          this.employee = person;
          this.empObj = person;
          this.drawMarker({layerX: this.empObj.positionX, layerY: this.empObj.positionY});
        });
      }
    });
  }

  resetAll(){
    this.drawMarker(null);
    this.empObj = {
      //_id: this._id,
      first_name: '',
      last_name: '',
      title: '',
      department: '',
      email: '',
      gender: '',
      location: '',
      phone: '',
      branch: '',
      positionX: 0,
      positionY: 0,
    }

  }
  goBack() {
    this.location.back();

  }
  previousMarker: any = [];
  drawMarker(event) {
    console.log('Before setting the points on click X: ', this.empObj.positionX)
    console.log('Before setting the points on click Y: ', this.empObj.positionY)

    if(event){
      this.x = event.layerX - 14//-510;
      this.y = event.layerY - 30//-115;
      var marker = new Image()
      marker.src = "/assets/images/marker4.png";
    }
    var map = new Image()
    map.src = "/assets/images/floorplan.jpg";

    map.onload = () => {
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(map, 0, 0, 950, 620);
      if(event){
        this.ctx.drawImage(marker, this.x, this.y, 28, 30);
        this.empObj.positionX = this.x;
        this.empObj.positionY = this.y;
      }
    }
  }

}
