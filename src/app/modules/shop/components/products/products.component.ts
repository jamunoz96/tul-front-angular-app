import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductModel } from '@tul/core/models/product.model';
import { NotificationService } from '@tul/core/services/notification.service';
import { addToCart, prepareToAddCart } from '../../store/actions/cart.actions';
import { updateProduct } from '../../store/actions/products.actions';
import { ProductState } from '../../store/reducer/product.reducer';
import { getCart } from '../../store/selector/cart.selectors';
import { getProductLoading, getProducts } from '../../store/selector/product.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productLoading: boolean = false;
  products: ProductModel[] = [];
  currentCart: ProductModel[] = [];
  constructor(
    private productStore: Store<ProductState>,
    private notification: NotificationService) {
    this.productStore.select(getProductLoading).subscribe(state => {
      this.productLoading = state;
    });

    this.productStore.select(getProducts)
      .subscribe(
        (state) => {
          this.products = JSON.parse(JSON.stringify(state));
        })

    this.productStore.select(getCart)
      .subscribe(
        (state) => {
          this.currentCart = state;
        })

  }

  ngOnInit(): void { }

  addToCart(product: ProductModel) {
    const currentQuantity = this.currentCart.find(p => p.id === product.id);
    if (currentQuantity && currentQuantity.quantity + product.quantity > 20) {
      this.notification.createNotification("error", "Operación cancelada", "No puedes agregar mas de 20 unidades de 1 producto", "bottomRight");
    }
    else {
      this.productStore.dispatch(prepareToAddCart({ data: product }));
      this.productStore.dispatch(updateProduct({ data: product }));
      this.notification.createNotification("success", "Proceso exitoso", "Producto agregado al carrito", "bottomRight");
    }
  }


}
