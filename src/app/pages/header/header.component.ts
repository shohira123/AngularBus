import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterserviceService } from '../../services/masterservice.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  masterservice = inject(MasterserviceService);
  isloginform: boolean = true;
  registerobj: any = {
    "fullname": "",
    "email": "",
    "password": "",
    "age": "",
    "gender": "",
    "role": ""
  }
  loginobj: any = {
    "emaillogin": "",
    "passwordlogin": "",
  }
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
  // ngOnInit(): void {
  //   console.log(this.islogindata);
  //   console.log(this.checktoken);
  //   this.masterservice.checkexpiry().subscribe((res: any) => {
  //     try {
  //       if (res) {
  //         if (res.status == 403) {
  //           localStorage.removeItem('userbus');
  //           localStorage.removeItem('token');
  //           this.islogindata = undefined;
  //         }
  //         else if (res.status == 401) {
  //           localStorage.removeItem('userbus');
  //           localStorage.removeItem('token');
  //           this.islogindata = undefined;
  //         }
  //       }
  //       else {
  //         alert(res.message);
  //         console.log(res.message);

  //       }
  //     } catch (error) {
  //       console.log(error);

  //       alert(error);
  //     }
  //   })

  // }


  showregisterform() {
    this.isloginform = false;
  }
  showloginform() {
    this.isloginform = true;

  } registerform() {
    this.masterservice.addusers(this.registerobj).subscribe((res: any) => {
      try {
        if (res.result == true) {
          alert(res.msg);
          this.registerobj = '';
          this.isloginform = true;

        } else {
          alert("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    })
  }
  // login start
  loginform() {
    console.log(this.loginobj);
    this.masterservice.loginusers(this.loginobj).subscribe((res: any) => {

      try {
        if (res.result == true) {
          alert(res.msg);
          this.loginobj = '';
          // const user = JSON.parse(localStorage.getItem(res.data));
          localStorage.setItem('userbus', JSON.stringify(res.data));
          localStorage.setItem('token', res.token);
          this.islogindata = res.data;

        } else {
          alert("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    })
  }
  // login end
  // logoff start
  logoff() {
    localStorage.removeItem('userbus');
    localStorage.removeItem('token');
    this.islogindata = undefined;
  }
  // logoff end


}
