import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { HttpService } from '../http.service';
import { Review } from '../review';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private _http:HttpService) { }

  ngOnInit() {
  }

  songModel = new Song( null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  reviewModel = new Review(null, null, null, null);

  //add a new song
  newSong(){
    this.songModel.submittedBy= localStorage.getItem('email');
    this._http.newSong(this.songModel).subscribe(data=>alert(data));
  }

  //add a new review
  newReview(){
    this.reviewModel.submittedBy= localStorage.getItem('email');
    this._http.newReview(this.reviewModel).subscribe(data=>alert(data));
  }

}
