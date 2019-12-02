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

  //login an existing user
  onSubmit(){
    this._http.authenticate(this.userModel).subscribe(data=>{

      //if the login was sucessful
      if(data.length==4){
        alert(data[0]);//display login sucess
        localStorage.setItem('token', data[1]);
        localStorage.setItem('email', data[2]);
        localStorage.setItem('admin', data[3]);//just to post a admin banner doesnt actualy give privlages
      }else if(data.length==5){
        //if user still hasnt verified their email give them another chance to
        this.email2=data
      }else{
        //if login was unsucessful or ther was an error
        alert(data);
      }
    });
  }

  //create a new user
  newUser(){
    this._http.newUser(this.newUserModel).subscribe(data=>{
      
      //if it was sucessfully created display an email with a verification link
      if(data.length==4){
        this.email1=data;
      }else{
        //if the email was already taken or there was an error
        alert(data);
      }
    });
  }

  //show the create functionality
  showCreate(){
    this.show=true;
  }
}
