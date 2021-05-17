import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private baseUrl ='http://localhost:8080/api/hotel';

  constructor(private http : HttpClient) { }

  createHotel(rdv : Object) : Observable<any> {
    return this.http.post(`${this.baseUrl}/add`,rdv);
  }
  getHotelList() : Observable<any> {
    return this.http.get(`${this.baseUrl}/`);

  }

  deleteHotel(id:number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/`+`${id}`,{responseType:'text'});
  }
  getHotel(id:number) : Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateHotel(id:number,value : any) : Observable<any> {
    return this.http.post(`${this.baseUrl}/update/${id}`,value);
  }
}
