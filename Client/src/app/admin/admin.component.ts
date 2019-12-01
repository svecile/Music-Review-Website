import { Component, OnInit } from '@angular/core';
import { Keyword } from '../keyword';
import { HttpService } from '../http.service';
import { Song } from '../song';
import { User } from '../user';
import { Policy } from '../policy';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  keyword = new Keyword(null);
  userModel = new User(null, null, null, null);
  songModel = new Song( null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  policyPModel = new Policy(null, null);
  policyPUpdateModel = new Policy(null, null);
  policyModel = new Policy(null, null);
  policyUpdateModel = new Policy(null, null);

  constructor(private _http:HttpService) { }

  ngOnInit() {
  }

  makeAdmin(){
    this._http.makeAdmin(this.keyword).subscribe(data=>alert(data));
  }

  setHidden(){
    this._http.setHidden(this.songModel).subscribe(data=>alert(data));
  }

  setActivity(){
    this._http.setActivity(this.userModel).subscribe(data=>alert(data));
  }

  newPPolicy(){
    this._http.newPPolicy(this.policyPModel).subscribe(data=>alert(data));
  }

  updatePPolicy(){
    this._http.updatePPolicy(this.policyPUpdateModel).subscribe(data=>alert(data));
  }

  newPolicy(){
    this._http.newPolicy(this.policyModel).subscribe(data=>alert(data));
  }

  updatePolicy(){
    this._http.updatePolicy(this.policyUpdateModel).subscribe(data=>alert(data));
  }
}
