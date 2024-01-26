import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ReadProductDto } from '../../products/ts';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-summary-cart',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './summary-cart.component.html',
  styleUrl: './summary-cart.component.scss'
})
export class SummaryCartComponent implements OnInit, OnDestroy {
  cartService = inject(CartService)
  cartService$ : Subscription = null!
  cartData : ReadProductDto[] = []
  formBuilder : FormBuilder = inject(FormBuilder)

  checkoutForm = this.formBuilder.group({
    email: ''
  });

  ngOnInit(): void {
    this.cartService$ = this.cartService.cartData.subscribe(data =>
       {
        this.cartData = data;
       })
   }

  ngOnDestroy(): void {
    this.cartService$.unsubscribe();
  }

  onSubmit(): void  {

    this.checkoutForm.value
  }

}
