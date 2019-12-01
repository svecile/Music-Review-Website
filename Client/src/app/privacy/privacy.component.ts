import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private _http:HttpService) { }

  policy: Object;

  ngOnInit() {
    this._http.getPolicy().subscribe(data => {
      console.log(data)
      this.policy = data;
    });
  }

}
