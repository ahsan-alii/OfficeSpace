import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Employees: any;
  showList = false;
  searchFor: string
  searchUsing: string;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }


  searchEmployee() {
    // alert('You are searching for: ' + this.searchFor + ' using ' + this.searchUsing)
    this.dataService.searchEmployee(this.searchFor, this.searchUsing)
      .subscribe((res: Employee[]) => {
        this.Employees = res;
        if (res.length > 0) this.showList = true;
        if (res.length == 0) alert('No Employees found against the given parameters');
        if (res.length != 0) console.log('Service sent: ', res);
      });

    //console.log('Service sent: ', this.Employees);
  }
}
