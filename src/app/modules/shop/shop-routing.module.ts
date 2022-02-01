import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '@tul/core/guards/signed-in.guard';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    canActivate: [SignedInGuard],
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
