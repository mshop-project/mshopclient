import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CartListComponent } from '../../components/cart-list/cart-list.component';
import { SummaryCartComponent } from '../../components/summary-cart/summary-cart.component';
import { CartService } from '../../services/cart.service';
import { ReadProductDto } from '../../products/ts';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, CartListComponent, SummaryCartComponent, MatButtonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit, OnDestroy{

  
  cartService = inject(CartService)
  cartData : WritableSignal<ReadProductDto[]> = signal([])
  cartData$ : Subscription = null!

  ngOnInit(): void {
    let oldCard = localStorage.getItem("cart");
    if(oldCard)
    {
      this.cartData.set(JSON.parse(oldCard!))
    }
  
    this.cartData$ = this.cartService.cartData.subscribe(data =>{
      this.cartData.set(data)
    })
  }

  ngOnDestroy(): void {
    this.cartData$.unsubscribe()
  }
  }

