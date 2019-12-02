import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {Song} from "../song";
import { Keyword } from '../keyword';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  availableItems: Object;
  topSongs: Object;
  results: Object;
  info:Object[]=[];
  reviews:Object[]=[];
  keywordModel = new Keyword('');
  showArr: boolean[]=[];

  songModel= new Song(null, null, null, null, null, null, null, null, null, null, null, null, null, null)
  constructor(private _http: HttpService) { }

  //on startup display 10 most popular songs
  ngOnInit() {
    this._http.homeSongs().subscribe(data => {
      this.topSongs = data;
    });
  }

  //search for a keyword
  search(){
    this._http.search(this.keywordModel).subscribe(data=>{
      this.results = data;
    });
  }

  //show song info for the song where the button was clicked
  toggleShow(title:string, i:string){
    this._http.getInfo(title).subscribe(data=>{
      this.info[parseInt(i)] = data;
      this.showArr[parseInt(i)] = true;
    });
  }
  //get all the reviews for a specific song
  getReviews(title:string, i:string){
    this._http.getReviews(title).subscribe(data => {
      this.reviews[parseInt(i)] = data;
    });
  }
}
