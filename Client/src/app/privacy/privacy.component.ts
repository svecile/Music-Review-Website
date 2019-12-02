import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private _http:HttpService) { }

  policy: Object;

  //display privacy policy
  ngOnInit() {
    this._http.getpPolicy().subscribe(data => {
      console.log(data)
      this.policy = data;
    });
  }

}
