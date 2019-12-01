import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user';
import { Song } from './song';
import {Keyword} from './keyword'
import { Review } from './review';
import { Policy } from './policy';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  homeSongs(){
    return this.http.get('http://localhost:8081/public/songs');
  }

  authenticate(user:User){
    return this.http.post<any>('http://localhost:8081/public/validate', user);
  }

  newUser(user:User){
    return this.http.put<any>('http://localhost:8081/public/new', user);
  }

  search(keyword:Keyword){
    return this.http.get<any>('http://localhost:8081/public/search/'+keyword.word);
  }

  getInfo(title:string){
    return this.http.get<any>('http://localhost:8081/public/songReviewInfo/'+title);
  }

  newSong(song:Song){
    return this.http.put<any>('http://localhost:8081/user/newSong', song);
  }

  newReview(review:Review){
    return this.http.put<any>('http://localhost:8081/user/addReview', review);
  }
  
  makeAdmin(keyword:Keyword){
    return this.http.post<any>('http://localhost:8081/admin/makeAdmin', keyword);
  }

  setHidden(song:Song){
    return this.http.post<any>('http://localhost:8081/admin/updateSongFlag', song);
  }

  setActivity(user:User){
    return this.http.post<any>('http://localhost:8081/admin/updateUserActivity', user);
  }
  newPolicy(policy:Policy){
    return this.http.put<any>('http://localhost:8081/admin/newPolicy', policy);
  }
  updatePolicy(policy:Policy){
    return this.http.post<any>('http://localhost:8081/admin/updatePolicy', policy);
  }

  getPolicy(){
    return this.http.get<any>('http://localhost:8081/public/getPolicy');
  }
}
