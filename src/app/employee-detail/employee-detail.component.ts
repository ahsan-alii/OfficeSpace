import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { Employee } from '../employee';
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  Employee: any;
  // putMarker: any;
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
    let _id = this.route.snapshot.params['id'];
    this.Employee = this.dataService.getEmployee(_id)
      .subscribe((resp: any) => {
        console.log('Response', resp);
        let person = resp;//.filter((emp: Employee) => { return emp._id == _id });
        this.Employee = person//[0]

        var canvas: any = document.getElementById("myCanvas");
        canvas.width = 960;
        canvas.height = 630;
        var ctx = canvas.getContext('2d');

        var map = new Image()
        map.src = "/assets/images/floorplan.jpg";
        var marker = new Image()
        marker.src = "/assets/images/marker4.png"
        //console.log('Canvas properties: ', canvas);
        map.onload = () => {
          console.log('X position:', this.Employee.positionX)
          console.log('Y position:', this.Employee.positionY)
          ctx.drawImage(map, 0, 0, 950, 620); //Drawing the floor plan
          ctx.drawImage(marker, this.Employee.positionX, this.Employee.positionY, 28, 30);  // Drawing Marker
        }

      }, (err: any) => {
        if (err.status == 404) console.log('Error: Employee Not Found');
      });

  }
  goBack() {
    this.location.back();
  }
}
