import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userModel = new User('', '');

  constructor(private _http: HttpService) { }

  ngOnInit() {
  }

  onSubmit(){

    this._http.authenticate(this.userModel).subscribe(data=>console.log('Item added', data));
  }
}
