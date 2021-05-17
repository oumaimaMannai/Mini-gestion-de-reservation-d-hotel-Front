import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../model/hotel';
import { HotelService } from '../service/hotel.service';
import { UserService } from '../_services/user.service';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  hotel: Hotel;
  hotels: any = [];
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;

  constructor(private userService: UserService,private tokenStorageService: TokenStorageService, private hotelService: HotelService, private router:Router) { }

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

    }

    this.hotel = new Hotel(); 
    this.reloadData();
  }

  updateHotel(id: number){
    this.router.navigate(['update', id]);
  }


  onCreate(id:number){

    Swal.fire({
    title: "You are sure ?",
    text: "You won't be able to go back !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete!',
    cancelButtonText:'Cancel'
    
  
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteHotel(id);
      Swal.fire(
        'Deleted !',
        'hotel is successfully deleted.',
        'success'
      )
    }
  });
}

deleteHotel(id: number) {
  this.hotelService.deleteHotel(id).subscribe( data=> {
  console.log(data);
  this.reloadData(); },
  error => console.log(error)); 
}

reloadData() {
  this.hotelService.getHotelList().subscribe(
    data => {
      console.log(data);
      this.hotels = data;
    },
    error => console.log(error)
    );
  }

}

