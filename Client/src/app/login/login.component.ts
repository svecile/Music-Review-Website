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
  email1: any;
  email2: any;

  constructor(private _http: HttpService) { }
 
  ngOnInit() {
  }

  onSubmit(){
    this._http.authenticate(this.userModel).subscribe(data=>{

      if(data.length==4){
        alert(data[0]);
        localStorage.setItem('token', data[1]);
        localStorage.setItem('email', data[2]);
        localStorage.setItem('admin', data[3]);//just to post a admin banner doesnt actualy give privlages
      }else if(data.length==5){
        this.email2=data
      }else{
        alert(data);
      }
    });
  }

  newUser(){
    this._http.newUser(this.newUserModel).subscribe(data=>{
      
      if(data.length==4){
        this.email1=data;
      }else{
        alert(data);
      }
    });
  }

  showCreate(){
    this.show=true;
  }
}
