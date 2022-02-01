import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductModel } from '@tul/core/models/product.model';
import { map, take } from 'rxjs/operators';
import { createOrder, removeToCart, updateProductCart } from '../../store/actions/cart.actions';
import { AppState } from '../../store/reducer/root.reducer';
import { getCart } from '../../store/selector/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: ProductModel[] = [];
  totalItems: number = 0;
  constructor(private shopStore: Store<AppState>) {
    this.shopStore.select(getCart).subscribe(state => {
      this.products = JSON.parse(JSON.stringify(state));
      this.totalItems = 0;
      state.forEach(a => this.totalItems += a.quantity );
    });
  }

  ngOnInit(): void {}

  removeProduct(id: string) {
    this.shopStore.dispatch(removeToCart({id: id}));
  }

  updateCart(value: any, product: ProductModel) {
    this.shopStore.dispatch(updateProductCart({data: {...product, quantity: value}}))
  }

  createOrder() {
    this.shopStore.dispatch(createOrder());
  }

}
