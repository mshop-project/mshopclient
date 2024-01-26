import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, Type, WritableSignal, inject, signal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { ReadCategoryDto, ReadProductDto } from '../../products/ts';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit, OnDestroy{


  cartService = inject(CartService)
  cartService$ : Subscription = null!
  dataToView : WritableSignal<CartProduct[]> = signal([])
  displayedColumns: string[] = ['name', 'category', 'quantity', 'price', 'action'];

  ngOnInit(): void {
   this.cartService$ = this.cartService.cartData.subscribe(data =>
      {
        this.dataToView.set(this.transformToCartProducts(data))
      })
      

  }
  deleteProduct(id: string)
  {
    this.cartService.deleteProduct(id)
  }

   transformToCartProducts(products: ReadProductDto[]): CartProduct[] {
    const uniqueProductsMap = new Map<string, CartProduct>();
  
    for (const product of products) {
      if (product.id) {
        if (!uniqueProductsMap.has(product.id)) {
          uniqueProductsMap.set(product.id, {
            id: product.id,
            name: product.name || '',
            category: product.category!,
            price: product.price!,
            quantity: 0,
          });
        }
  
        const cartProduct = uniqueProductsMap.get(product.id);
  
        if (cartProduct) {
          cartProduct.quantity++;
        }
      }
    }
  
    return Array.from(uniqueProductsMap.values());
  }

  ngOnDestroy(): void {
    this.cartService$.unsubscribe();
  }

}

type CartProduct = {
  id: string
  name: string
  category: ReadCategoryDto
  price: number
  quantity: number  
};