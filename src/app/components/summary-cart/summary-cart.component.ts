import { AfterViewInit, Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ReadProductDto } from '../../products/ts';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderDto, OrderService } from '../../orders/ts';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-summary-cart',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterModule],
  templateUrl: './summary-cart.component.html',
  styleUrl: './summary-cart.component.scss'
})
export class SummaryCartComponent implements OnInit, OnDestroy, AfterViewInit {

  cartService = inject(CartService)
  orderService = inject(OrderService)
  cartService$ : Subscription = null!
  discount$ : Subscription = null!
  cartData : WritableSignal<ReadProductDto[]> = signal([])
  formBuilder : FormBuilder = inject(FormBuilder)
  totalPrice = signal(0)
  discount = signal(0)
  endPrice = signal(0)
  checkoutForm = this.formBuilder.group({
    email: [localStorage.getItem("clientEmail") ?? '', [
      Validators.required, Validators.email,
      (control : AbstractControl) => {
        const email = control.value;
        if (!email) {
          return null; // Dopuszczamy brak adresu email
        }
    
        // Wzorzec do sprawdzenia poprawności adresu email
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        if (!emailPattern.test(email)) {
          return { invalidFormat: true }; // Nieprawidłowy format e-mail
        }
    
        return null; // Poprawny adres e-mail
      }
    ]]
  });
  givenEmail = signal("")
    router = inject(Router)
  
  
  ngOnInit(): void {
    this.givenEmail.set(localStorage.getItem("clientEmail") ?? '')
    this.cartService$ = this.cartService.cartData.subscribe(data =>
       {
        this.cartService.calculateDiscount()
        this.cartData.set(data);
       })
   }

   calculatePrice()
   {
     let currentPrice = 0;
     for (const product of this.cartData()) {
       currentPrice += product.price! 
   }
   this.totalPrice.set(currentPrice)
   this.endPrice.set(currentPrice - this.discount()/100 * currentPrice)
   }

  ngAfterViewInit() : void{
  
    this.discount$ = this.cartService.cartDiscount.subscribe(discount =>
      {
      this.discount = signal(discount)
      this.calculatePrice()
      })
  }
  finalizeOrder() {
    const emailVal = this.givenEmail();
    let email = "Anonymouse"
    if(emailVal != null && emailVal.length != 0)
    {
      email = emailVal;
    }
    
    const orderDto : OrderDto = {
      clientEmail: email,
      discountPercentage: this.discount(),
      idProducts: this.cartData().map((product) => product.id!),
      totalPriceBeforeDiscount: this.totalPrice(),
      totalPriceAfterDiscount: this.endPrice()
    }

    const $sub = this.orderService.orderPost(orderDto).subscribe(data=>{
      $sub.unsubscribe();
    })
    localStorage.clear();
    this.cartService.cartData.next([])
    this.router.navigate(["finalize"])
  }


  onSubmit(): void  {
    if(this.checkoutForm.value.email)
    {
    const email = this.checkoutForm.value.email!;
    localStorage.setItem("clientEmail", email)
    this.givenEmail.set(email)
    this.cartService.calculateDiscount(email)
    }
  }

  ngOnDestroy(): void {
    this.cartService$?.unsubscribe();
    this.discount$?.unsubscribe();
  }

}
