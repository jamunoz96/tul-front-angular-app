import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  Store } from '@ngrx/store';
import { ProductModel } from '@tul/core/models/product.model';
import { CartService } from '@tul/core/services/cart.service';
import { NotificationService } from '@tul/core/services/notification.service';
import { AuthState } from '@tul/modules/auth/store/reducer/auth.reducer';
import { getAuthUser } from '@tul/modules/auth/store/selector/auth.selectors';
import { map, switchMap, take } from 'rxjs/operators';
import {
  prepareToAddCart,
  addToCart,
  createOrder,
  anyAction,
  refreshCart,
  updateProductCart,
  createOrderSuccess,
  createOrderFailure,
  loadOrders
} from '../actions/cart.actions';
import { CartState } from '../reducer/cart.reducer';
import { getCart } from '../selector/cart.selectors';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<CartState>,
    private storeAuth$: Store<AuthState>,
    private cartService: CartService,
    private router: Router,
    private notification: NotificationService
  ) { }

  prepareToAddCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(prepareToAddCart),
      switchMap((param) => {
        return this.store$.select(getCart).pipe(
          map(state => {
            const index = state.findIndex(p => p.id === param.data.id);
            if(index>=0) {
              const clone : ProductModel[] = JSON.parse(JSON.stringify(state));
              clone.filter(p => p.id === param.data.id).map(p => p.quantity = p.quantity + param.data.quantity );
              return refreshCart({ data: clone });
            } else {
              return addToCart({ data: param.data });
            }
          }),
          take(1),
        )
      })
    );
  });

  updateProductCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProductCart),
      switchMap((param) => {
        return this.store$.select(getCart).pipe(
          map(state => {
            const clone : ProductModel[] = JSON.parse(JSON.stringify(state));
            clone.filter(p => p.id === param.data.id).map(p => {
              p.quantity = param.data.quantity
            });
            return refreshCart({ data: clone });
          }),
          take(1),
        )
      })
    );
  });

  createOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createOrder),
      switchMap(() => {
        return this.store$.select(getCart).pipe(
          map((state) => {
            this.cartService.createOrder(state)
            .then((order) => {
              this.router.navigate(['/shop/orders']);
              this.notification.createNotification("success", "Operación exitosa", "Se guardó correctamente la orden");
              return createOrderSuccess()
            }).catch((error) => {
              this.notification.createNotification("error", "Operación fallida", "Se presentó un problema al crear la orden");
              return createOrderFailure({error: error.message})
            })
          }),
          take(1)
        )
      })
    );
  }, { dispatch: false});

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadOrders),
      switchMap(() => {
        return this.storeAuth$.select(getAuthUser).pipe(
          map(state => {
            if(state) {
              console.log("tiene state de auth")
              // this.cartService.loadOrders(state.id).then(data => {
              //   console.log(data)
              // });
            }
            return anyAction();
          }),
        )
      })
    );
  });

}
