import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MasterserviceService } from '../../services/masterservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-useraccount',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './useraccount.component.html',
  styleUrl: './useraccount.component.css'
})
export class UseraccountComponent implements OnInit {
  bookingid: Number = 0;
  userid: any;
  BookingDetail: any[] = [];
  constructor(private activatedRoute: ActivatedRoute, private masterservice: MasterserviceService, private router: Router) {
    this.activatedRoute.params.subscribe((res: any) => {
      // console.log(res);
      this.bookingid = res.bookid;
      this.userid = res.userid;
      console.log(this.bookingid);
      console.log(this.userid);


    })
    // this.activatedRoute.queryParams.subscribe((res: any) => {
    //   this.bookingid = res.userid;
    // });
  }
  // constructor end


  ngOnInit(): void {
    this.masterservice.useraccount(this.bookingid, this.userid).subscribe((res: any) => {

      try {
        if (res) {
          this.BookingDetail = res;
          console.log(res);
        }
      } catch (error) {
        console.log(error);

        // this.router.navigate(['/useraccount']);
      }
      // if (res.status == 403) {
      //   console.log(res.status);
      // }
    })


  }

}
