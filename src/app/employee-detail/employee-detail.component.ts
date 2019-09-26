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
  // putMarker: any;
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
    //console.log('Router object: ', this.router);

  }

  ngOnInit() {
    var canvas: any = document.getElementById("myCanvas");
    canvas.width = 960;
    canvas.height = 630;
    var ctx = canvas.getContext('2d');
    var marker = new Image()
    marker.src = "/assets/images/marker4.png"

    //to get the IDs of all employees, for iterating
    this.dataService.getEmployees().subscribe((list: any) => {

      this.EmployeeIds = list.map(person => person._id)
      this.nextEmployeeIndex = (this.EmployeeIds.indexOf(_id) + 1)
      this.previousEmployeeIndex = (this.EmployeeIds.indexOf(_id) - 1)
      console.log('Index of current employee: ', this.EmployeeIds.indexOf(_id));

      this.previousEmployeeId = this.EmployeeIds[this.previousEmployeeIndex]
      this.nextEmployeeId = this.EmployeeIds[this.nextEmployeeIndex];
      // console.log('Index of previous employee: ', this.previousEmployeeIndex);
      // console.log('Id of previous employee: ', this.nextEmployeeId);
      // console.log('Index of next employee: ', this.nextEmployeeIndex);
      // console.log('Id of next employee: ', this.previousEmployeeId);
    })
    //   this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    //   .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    // }

    this.route.params.pipe(switchMap((params: Params) =>
      this.dataService.getEmployee(params['id']))).
      subscribe((employee) => {
       _id = this.route.snapshot.params['id'];
       console.log('Snapshot id: ',_id)
        this.Employee = employee
        this.nextEmployeeIndex = (this.EmployeeIds.indexOf(_id) + 1)
        this.previousEmployeeIndex = (this.EmployeeIds.indexOf(_id) - 1)
        console.log('Index of current employee: ', this.EmployeeIds.indexOf(_id));

        this.previousEmployeeId = this.EmployeeIds[this.previousEmployeeIndex]
        this.nextEmployeeId = this.EmployeeIds[this.nextEmployeeIndex];

      });

    var _id = this.route.snapshot.params['id'];
    // console.log('paramMap: ', this.route.paramMap)
    // console.log('Params: ', this.route.params)
    this.route.params.subscribe(x => console.log('Param subscribed id: ', x))
    this.route.paramMap.subscribe(id => console.log('ParamMap Subscribed id: ', id));
    this.route.paramMap.subscribe(id => console.log('ParamMap Subscribed ALL: ', id.get('id')));


    this.Employee = this.dataService.getEmployee(_id)
      .subscribe((resp: any) => {
        console.log('Response', resp);
        let person = resp;//.filter((emp: Employee) => { return emp._id == _id });
        this.Employee = person//[0]


        var map = new Image()
        map.src = "/assets/images/floorplan.jpg";

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
