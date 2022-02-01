import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../store/actions/products.actions';
import { ProductState } from '../../store/reducer/product.reducer';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private productStore: Store<ProductState>) {
      this.productStore.dispatch(loadProducts());
  }

  ngOnInit(): void {
  }

}
