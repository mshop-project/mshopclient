import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ReadProductDto } from '../products/ts';
import { CalculateDiscountDto, DiscountsService } from '../discounts/ts';
@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {
  
  cartData = new BehaviorSubject<Array<ReadProductDto>>([])
  cartDiscount = new BehaviorSubject(0)

  discountsService = inject(DiscountsService)
  discountsService$ : Subscription = null!;
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

  calculateDiscount(email? : string)
  {
    const cartProductsId : string[] = this.cartData.value.map((product) => product.id!)
    const calculateDiscountDto : CalculateDiscountDto = {
      productIds: cartProductsId,
      customerEmail: email
    }
    this.discountsService$ = this.discountsService.discountsCalculatePost(calculateDiscountDto).subscribe(response=>
      {
        this.cartDiscount.next(response.discount!)
      })
  }
  ngOnDestroy(): void {
    this.discountsService$?.unsubscribe()
  }
}
