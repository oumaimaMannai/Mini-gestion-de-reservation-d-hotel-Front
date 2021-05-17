import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '../model/hotel';
import { HotelService } from '../service/hotel.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {
  content: any;
  id:any;
  hotel:any;
  

  constructor(private userService: UserService,private router: Router,private route: ActivatedRoute,
    private hotelService: HotelService) { }

  ngOnInit() {

    this.hotel = new Hotel();
  
    this.id = this.route.snapshot.params['id'];

    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.hotelService.getHotel(this.id)
    .subscribe(data => {
      console.log(data)
      this.hotel = data;
    }, error => console.log(error));

    console.log(this.hotel);
  }



  updateHotel() {
    this.hotelService.updateHotel(this.id, this.hotel)
      .subscribe(data => {
        console.log(data);
        this.hotel = new Hotel();
        this.gotoList();
      }, error => console.log(error));
  }
  onSubmit() {
    this.updateHotel();
  }

  gotoList() {
    this.router.navigate(['/']);
  }
}
