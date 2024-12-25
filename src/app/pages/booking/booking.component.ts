import { Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterserviceService } from '../../services/masterservice.service';
import { FormsModule } from '@angular/forms';
import { UseraccountComponent } from '../useraccount/useraccount.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [HeaderComponent, FormsModule, UseraccountComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  scheduleid: number = 0;
  scheduledata: any;
  seatarray: number[] = [];
  SelectedSeatArrayByuser: number[] = [];
  bookedarray: number[] = [];
  bookedarray2: number[] = [];
  userselectedseatArrayObject: any[] = [];
  total = 0;
  bid: any = "";



  constructor(private router: Router, private activatedRout: ActivatedRoute, private masterservice: MasterserviceService) {

    this.activatedRout.params.subscribe(((res: any) => {
      this.scheduleid = res.id;
      console.log(res);
      console.log(this.scheduleid);
      this.getscheduledetailByid();
      this.getBookSeatById();

    }))
  };

  // input number for age start

  // input number for age end

  // constructor end
  // getscheduledetailByid start
  getscheduledetailByid() {
    this.masterservice.searchScheduleById(this.scheduleid).subscribe((res: any) => {
      // debugger;
      this.scheduledata = res;
      // console.log(this.scheduledata.totalSeats)
      for (let i = 1; i <= this.scheduledata.totalSeats; i++) {
        this.seatarray.push(i);
      }
    })
  }
  // getscheduledetailByid end

  // searcBookSeatById start
  getBookSeatById() {
    this.masterservice.searchBookedSeatById(this.scheduleid).subscribe((res: any) => {
      this.bookedarray = res.bookedseat;
      // this.bid=res._id;
    })
  }
  // searcBookSeatById end

  // check if seat is book start
  checkIfSeatBooked(seatno: number) {
    // let result = this.bookedarray.indexOf(seatno);
    return this.bookedarray.indexOf(seatno);
  }
  // check if seat is book end


  // check for selected seat start
  selectedseat(seatno: number) {
    const passengerobj = {
      passengername: "",
      age: 0,
      gender: "",
      seatno: 0,
      price: 0
    }

    passengerobj.seatno = seatno;
    passengerobj.price = this.scheduledata.price;

    // this.userselectedseatArray.findIndex(m => m.seatno == seatno);
    const checkingduplicates = this.userselectedseatArrayObject.findIndex(m => m.seatno === seatno);
    if (checkingduplicates === -1) {
      // this.total= passengerobj.price
      console.log(seatno);
      console.log("******************");

      this.SelectedSeatArrayByuser.push(passengerobj.seatno);
      this.userselectedseatArrayObject.push(passengerobj);
      this.total = this.total + passengerobj.price
    }
    else {
      var index = this.userselectedseatArrayObject.map(x => {
        return x.seatno;
      }).indexOf(seatno);


      const indexseatno = this.SelectedSeatArrayByuser.indexOf(seatno);
      if (indexseatno !== -1) {
        this.SelectedSeatArrayByuser.splice(indexseatno, 1);
      }

      this.userselectedseatArrayObject.splice(index, 1);
      this.total = this.total - passengerobj.price

    }

    // if (this.userselectedseatArray.indexOf(seatno) === -1) {
    //     this.userselectedseatArray.push(seatno);
    // }

    // else {
    //   const index = this.userselectedseatArray.indexOf(seatno);
    //   if (index !== -1) {
    //     this.userselectedseatArray.splice(index, 1);
    //   }
    // }
    console.log(this.userselectedseatArrayObject);
  }

  checkisseatselected(seatno: number) {
    // return this.userselectedseatArray.indexOf(seatno);
    return this.userselectedseatArrayObject.findIndex(m => m.seatno == seatno);
  }
  // check for selected seat end
  // booking start
  bookingnow() {
    const localuser = localStorage.getItem('userbus');

    if (localuser != null) {


      const logdata = JSON.parse(localuser);

      var booknowobj =
      {
        "scheduleid": this.scheduleid,
        "custid": logdata._id,
        "bookingdate": new Date(),
        "totalamount": this.total,
        "busbookingpassengers": this.userselectedseatArrayObject
      }
      const seatarrayobj = {
        "scheduleid": this.scheduleid,
        "bookedseat": this.SelectedSeatArrayByuser,

      }
      console.log(booknowobj);
      console.log("*****************");


      this.masterservice.booking(booknowobj).subscribe((res: any) => {

        console.log("////////////////////////");
        console.log(res.data._id);
        alert('booking successfull');
        const idforuserAccount = res.data._id;
        if (this.bookedarray == null || this.bookedarray.length == 0) {
          // debugger;
          this.masterservice.postbookseatarray(seatarrayobj).subscribe((res1: any) => {
            console.log(res1)
            alert(res1.msg);
            this.getBookSeatById();
            // window.location.reload();
            this.router.navigate(['/useraccount', logdata._id, idforuserAccount]);

          })
        }
        else {
          // debugger;
          this.masterservice.updatebookseatarray(seatarrayobj).subscribe((res2: any) => {
            console.log(res2)
            alert(res2.msg);

            this.getBookSeatById();
            // window.location.reload()
            this.router.navigate(['/useraccount', logdata._id, { bookid: idforuserAccount }]);
            // this.router.navigate(['/useraccount', idforuserAccount]);

          })
        }

      });



    }    // if close
    else {
      alert('please login');
    }
  }
  // booking end
}
