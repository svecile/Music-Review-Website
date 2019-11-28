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
  keywordModel = new Keyword('');

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
    this._http.search(this.keywordModel).subscribe(data=>{
      this.results = data;
    });
  }

}
