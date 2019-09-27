import { Component, OnInit, Input } from '@angular/core';
import { Params, Router, ActivatedRoute, Event, NavigationEnd, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { Employee } from '../employee';
import { element } from 'protractor';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})

export class EmployeeDetailComponent implements OnInit {
  Employee: any;
  EmployeeIds: any[];
  currentEmployeeIndex: any;

  nextEmployeeIndex: any;
  previousEmployeeIndex: any;

  nextEmployeeId: any;
  previousEmployeeId: any;

  ErrorOccured = false;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {

  }
  ngOnInit() {

    // var _id = this.route.snapshot.params['id'];
    //var _id = this.route.paramMap.subscribe((id:any) => { _id = id.params.id })

    this.route.paramMap.subscribe(params => {
      console.log('ParamMap Subscribed id: ', params.get('id'))
      let _id: number = +params.get('id')
      console.log('Subscribed idaaaaaaaa: ', _id)
      // this.dataService.getEmployee(_id).subscribe(employee => console.log('Employee: ', employee))
    });


    var canvas: any = document.getElementById("myCanvas");
    canvas.width = 960;
    canvas.height = 630;
    var ctx = canvas.getContext('2d');
    var marker = new Image()
    marker.src = "/assets/images/marker4.png"


    this.route.params.pipe(switchMap((params: Params) =>
      this.dataService.getEmployee(params['id'])))
      .subscribe((employee) => {
        //  var _id = this.route.snapshot.params['id'];
        var _id;
        this.route.params.subscribe(param => _id = param.id)
        //  var _id = this.route.paramMap.subscribe((id:any) => { _id = id.params.id })
        //var _id = this.route.params.subscribe(param => console.log('Param subscribed id: ', param.id))
        console.log('Snapshot id: ', _id)
        this.Employee = employee

        //to get the IDs of all employees, for iterating
        this.dataService.getEmployeeIds().subscribe((list: any) => {
          this.EmployeeIds = list.map(person => person._id)

          this.nextEmployeeIndex = (this.EmployeeIds.indexOf(_id) + 1)
          this.previousEmployeeIndex = (this.EmployeeIds.indexOf(_id) - 1)
          console.log('Index of current employee: ', this.EmployeeIds.indexOf(_id));

          this.previousEmployeeId = this.EmployeeIds[this.previousEmployeeIndex]
          this.nextEmployeeId = this.EmployeeIds[this.nextEmployeeIndex];
        })


        var map = new Image()
        map.src = "/assets/images/floorplan.jpg";

        map.onload = () => {
          console.log('X position:', this.Employee.positionX)
          console.log('Y position:', this.Employee.positionY)
          ctx.drawImage(map, 0, 0, 950, 620); //Drawing the floor plan
          ctx.drawImage(marker, this.Employee.positionX, this.Employee.positionY, 28, 30);  // Drawing Marker
        }

      }, (err: any) => {
        if (err.status == 404) {
          this.ErrorOccured = true;
          console.log('Error: Employee Not Found');
        }
        // })


      });
    // this.route.params.subscribe(param => console.log('Param subscribed id: ', param.id))
    // this.route.paramMap.subscribe(params => console.log('ParamMap Subscribed id: ', params.get('id')));
    // this.route.paramMap.subscribe(id => console.log('ParamMap Subscribed ALL: ', id.getAll('id')));



  }
}