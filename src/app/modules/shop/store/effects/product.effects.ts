import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { ProductService } from '@tul/core/services/product.service';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  updateProduct,
  updateProductSuccess,
} from '../actions/products.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { getProducts } from '../selector/product.selectors';
import { ProductModel } from '@tul/core/models/product.model';
import { ProductState } from '../reducer/product.reducer';

@Injectable()
export class LoadProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store$: Store<ProductState>
  ) {}

  loadProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() => {
        return this.productService.loadProducts().pipe(
          map((products) => {
            return loadProductsSuccess({data: products})
          }),
          catchError((e) => of(loadProductsFailure({ error: `${e}` }))),
          take(1)
        )
      })
    );
  });


  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProduct),
      switchMap((param) => {
        return this.store$.select(getProducts).pipe(
          map((state) => {
            const clone : ProductModel[] = JSON.parse(JSON.stringify(state));
            clone.filter(p => p.id === param.data.id).map(p => {
              p.quantity = param.data.quantity
            });
            return updateProductSuccess({data: clone})
          }),
          take(1)
        )
      })
    );
  });

}
