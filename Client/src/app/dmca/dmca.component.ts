import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.scss']
})
export class DMCAComponent implements OnInit {

  constructor(private _http:HttpService) { }

  policy: Object;

  ngOnInit() {
    this._http.getPolicy().subscribe(data => {
      console.log(data)
      this.policy = data;
    });
  }

}
