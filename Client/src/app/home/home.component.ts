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
  info=new Object();
  keywordModel = new Keyword('');
  show: boolean=false;

  songModel= new Song(null, null, null, null, null, null, null, null, null, null, null, null, null, null)
  constructor(private _http: HttpService) { }

  ngOnInit() {
    //this._http.getAll().subscribe(data => {
      //this.availableItems = data;
    //});

    this._http.homeSongs().subscribe(data => {
      this.topSongs = data;
    });
  }

  search(){
    this._http.search(this.keywordModel).subscribe(data=>{
      this.results = data;
    });
  }

  toggleShow(title:string){
    this._http.getInfo(title).subscribe(data=>{
      this.info = data;
      this.show = true;
    });
  }
}
