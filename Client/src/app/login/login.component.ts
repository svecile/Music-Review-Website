import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpService } from '../http.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userModel = new User("", "", null, null);
  newUserModel = new User("", "", null, null);
  
  email= new FormControl('',[
    Validators.required,
    Validators.email
  ]);
  
  constructor(private _http: HttpService) { }

  ngOnInit() {
  }

  onSubmit(){
    this._http.authenticate(this.userModel).subscribe(data=>{
      
      alert(data);

      if(Object.keys(data).length==3){
        localStorage.setItem('token', data[1]);
        localStorage.setItem('email', data[2]);
        console.log(data)
      }
    });
  }

  newUser(){
    this._http.newUser(this.newUserModel).subscribe(data=>alert(data));
  }
}
