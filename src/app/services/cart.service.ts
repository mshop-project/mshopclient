import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReadProductDto } from '../products/ts';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartData = new BehaviorSubject<Array<ReadProductDto>>([]);

  constructor() { }

  addProduct(readProductDto : ReadProductDto)
  {
    this.cartData.next([...this.cartData.value, readProductDto])
  }

  deleteProduct(id : string)
  {
    const updatedData = this.cartData.value.filter(product => product.id !== id);
    this.cartData.next(updatedData)
  }
}
