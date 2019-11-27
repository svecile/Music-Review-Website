import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from './product';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get('http://3.82.47.246:8081/products/getAll');
  }

  addItem(product:Product){
    return this.http.post<any>('http://3.82.47.246:8081/products/create', product);
  }

  homeSongs(){
    return this.http.get('http://localhost:8081/open/songs');
  }
  
  authenticate(user:User){
    return this.http.post<any>('http://localhost:8081/open/validate', user);
  }

  newUser(user:User){
    return this.http.put<any>('http://localhost:8081/open/new', user);
  }
  
}
