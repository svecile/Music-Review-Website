import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  productModel = new Product('Harry Potter', 'book', 3);

  constructor(private _http: HttpService) { }

  ngOnInit() {
    
  }
  onSubmit(){
    this._http.addItem(this.productModel).subscribe(data=>console.log('Item added', data));
  }
}
