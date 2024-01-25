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
    const currentData = this.cartData.value;
    const indexToRemove = currentData.findIndex(product => product.id === id);

  if (indexToRemove !== -1) {
    currentData.splice(indexToRemove, 1); 
    this.cartData.next(currentData); 
  }
  }
}
