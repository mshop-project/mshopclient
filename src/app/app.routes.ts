import { Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { FinalizeOrderPageComponent } from './pages/finalize-order-page/finalize-order-page.component';

export const routes: Routes = [
    {
      path:'',
      component: ProductsPageComponent,
    },
    {
      path:'cart',
      component: CartPageComponent,
    },
    {
      path:'finalize',
      component: FinalizeOrderPageComponent,
    }
    ];  