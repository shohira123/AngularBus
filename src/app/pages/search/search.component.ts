import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { MasterserviceService } from '../../services/masterservice.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, AsyncPipe, DatePipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  location$: Observable<any[]> = new Observable<any[]>
  masterservice = inject(MasterserviceService);

  searchobj: any = {
    fromLocation: "",
    toLocation: "",
    travelDate: ""
  };
  buslist: any[] = [];

  islogindata: any;
  checktoken: any;
  constructor() {
    const localuser = localStorage.getItem('userbus');
    const token = localStorage.getItem('token');
    if (localuser != null && token != null) {
      this.islogindata = JSON.parse(localuser);
      this.checktoken = token;
    }
  }
  // lates start
  ngOnInit(): void {
    // console.log(this.islogindata);
    // console.log(this.checktoken);
    this.getlocations();
    this.masterservice.checkexpiry().subscribe((res: any) => {
      try {
        if (res) {
          if (res.status == 403) {
            localStorage.removeItem('userbus');
            localStorage.removeItem('token');
            this.islogindata = undefined;
          }
          else if (res.status == 401) {
            localStorage.removeItem('userbus');
            localStorage.removeItem('token');
            this.islogindata = undefined;
          }
        }
        else {
          alert(res.message);
          console.log(res.message);

        }
      } catch (error) {
        console.log(error);

        alert(error);
      }
    })

  }
  // latest end

  getlocations() {
    // debugger;
    this.location$ = this.masterservice.getlocations();
    // debugger;
  }

  onsearch() {

    const { fromLocation, toLocation, travelDate } = this.searchobj;
    // console.log(fromLocation);
    // console.log(toLocation);
    // console.log(travelDate);
    this.masterservice.searchbus(fromLocation, toLocation, travelDate).subscribe((res: any) => {
      // console.log(res);
      // console.log("********************************");

      if (res.length === 0 || res === undefined || res === null) {
        // Empty the currentArray
        this.buslist = [{ "msg": "not found" }];
      }
      else {
        this.buslist = res;
      }



      // console.log(this.buslist);
      // console.log("********************************");
    })
  }



}
