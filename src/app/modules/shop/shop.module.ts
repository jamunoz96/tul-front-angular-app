import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ShopComponent } from './components/shop/shop.component';
import { NgZorroAntdModule } from '@tul/modules/ng-zorro/ng-zorro-antd.module';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { EffectsModule } from '@ngrx/effects';
import { LoadProductEffects } from './store/effects/product.effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { CartEffects } from './store/effects/cart.effects';
import { rootReducer } from './store/reducer/root.reducer';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ShopComponent,
    ProductsComponent,
    CartComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShopRoutingModule,
    NgZorroAntdModule,
    EffectsModule.forFeature([
      LoadProductEffects,
      CartEffects
    ]),
  ]
})
export class ShopModule { }
