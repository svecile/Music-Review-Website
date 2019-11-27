import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from './product';

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
  
}
