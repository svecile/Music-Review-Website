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
    return this.http.get('/api/public/songs');
  }

  search(keyword:Keyword){
    return this.http.get<any>('/api/public/search/'+keyword.word);
  }

  getInfo(title:string){
    return this.http.get<any>('/api/public/songReviewInfo/'+title);
  }

  getReviews(title:string){
    return this.http.get<any>('/api/public/reviews/'+title);
  }

  authenticate(user:User){
    return this.http.post<any>('/api/public/validate', user);
  }

  newUser(user:User){
    return this.http.put<any>('/api/public/new', user);
  }

  newSong(song:Song){
    return this.http.put<any>('/api/user/newSong', song);
  }

  newReview(review:Review){
    return this.http.put<any>('/api/user/addReview', review);
  }
  
  makeAdmin(keyword:Keyword){
    return this.http.post<any>('/api/admin/makeAdmin', keyword);
  }

  setHidden(song:Song){
    return this.http.post<any>('/api/admin/updateSongFlag', song);
  }

  setActivity(user:User){
    return this.http.post<any>('/api/admin/updateUserActivity', user);
  }
  newPPolicy(policy:Policy){
    return this.http.put<any>('/api/admin/newpPolicy', policy);
  }
  updatePPolicy(policy:Policy){
    return this.http.post<any>('/api/admin/updatePPolicy', policy);
  }

  getpPolicy(){
    return this.http.get<any>('/api/public/getpPolicy');
  }
  newPolicy(policy:Policy){
    return this.http.put<any>('/api/admin/newPolicy', policy);
  }

  updatePolicy(policy:Policy){
    return this.http.post<any>('/api/admin/updatePolicy', policy);
  }

  getPolicy(){
    return this.http.get<any>('/api/public/getPolicy');
  }

}
