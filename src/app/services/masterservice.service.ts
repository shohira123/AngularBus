import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterserviceService {
  apiurl: string = "http://localhost:1113/busapi/";

  constructor(private http: HttpClient) {

  }
  getlocations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiurl + "getLocations")
  }
  searchbus(fromLocation: object, toLocation: object, travelDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiurl}searchBus/${fromLocation}/${toLocation}/${travelDate}`)
  }
  searchScheduleById(sid: number) {
    return this.http.get<any[]>(`${this.apiurl}searchScheduleById/${sid}`)
  }

  searchBookedSeatById(sid: number) {
    return this.http.get<any[]>(`${this.apiurl}searchBookSeatById/${sid}`)
  }
  addusers(obj: any) {
    return this.http.post(`${this.apiurl}adduser`, obj)
  }
  loginusers(obj: any) {
    return this.http.post(`${this.apiurl}login`, obj)
  }
  booking(obj: any) {
    return this.http.post(`${this.apiurl}Booking`, obj)
  }

  updatebookseatarray(obj: any) {
    return this.http.put(`${this.apiurl}updateBookSeatById`, obj)
  }

  postbookseatarray(obj: any) {
    return this.http.post(`${this.apiurl}postBookSeatArray`, obj)
  }

  useraccount(bid: any, userid: any) {
    console.log(bid)
    console.log(userid)
    let headers = new HttpHeaders()
      .set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.apiurl}user/useraccount/${userid}/${bid}`, {}, { headers });
  }
  checkexpiry() {
    let headers = new HttpHeaders()
      .set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.apiurl}user/checkexpiry`, {}, { headers });
  }

}


