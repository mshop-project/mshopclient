import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartListComponent } from '../../components/cart-list/cart-list.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, CartListComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {

}
