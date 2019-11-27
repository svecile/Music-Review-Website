import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  availableItems: Object;
  topSongs: Object;
  song: Object;
  
  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getAll().subscribe(data => {
      this.availableItems = data;
    });

    this._http.homeSongs().subscribe(data => {
      this.topSongs = data;
    });
  }

  search(){

  }



}
