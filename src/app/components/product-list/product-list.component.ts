import { Component, WritableSignal, signal, OnInit, inject, OnDestroy } from '@angular/core';
import { ProductsService, ReadProductDto } from '../../products/ts';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ProductListComponent implements OnInit, OnDestroy {


  products : WritableSignal<Array<ReadProductDto>> = signal([])
  productsService = inject(ProductsService)
  productsService$ : Subscription = null!

  ngOnInit(): void {
   this.productsService$ = this.productsService.productsGet().subscribe((data) =>{
      this.products.set(data)
   })
  }

  ngOnDestroy(): void {
   this.productsService$.unsubscribe()
  }


}
