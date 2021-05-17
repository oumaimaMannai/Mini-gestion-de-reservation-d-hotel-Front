import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../model/hotel';
import { HotelService } from '../service/hotel.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = '';
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  hotel: Hotel;
  submitted = false;
  phot = "hotel-presidente.jpg";

  constructor(private userService: UserService,
    private authService: AuthService, 
    private router: Router,
    private hotelService: HotelService) { }

  ngOnInit() {
    this.hotel = new Hotel();
    this.hotel.photo="hotel-presidente.jpg";
    
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  save() {
    this.hotelService.createHotel(this.hotel).subscribe(data => {
      this.hotel = data;
      console.log(data);
      this.gotoList();
    },
    error => console.log(error));    
  }

  gotoList() {
    this.router.navigate(['/']);
  }
}

