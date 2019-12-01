import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userModel = new User("", "", null, null);
  newUserModel = new User("", "", null, null);
  show:boolean = false;
  constructor(private _http: HttpService) { }

  ngOnInit() {
  }

  onSubmit(){
    this._http.authenticate(this.userModel).subscribe(data=>{
      
      alert(data);

      if(Object.keys(data).length==4){
        localStorage.setItem('token', data[1]);
        localStorage.setItem('email', data[2]);
        localStorage.setItem('admin', data[3]);//just to post a admin banner doesnt actualy give privlages
        console.log(data)
      }
    });
  }

  newUser(){
    this._http.newUser(this.newUserModel).subscribe(data=>alert(data));
  }

  showCreate(){
    this.show=true;
  }
}
