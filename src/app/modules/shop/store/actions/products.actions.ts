import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/core/models/product.model';

export const loadProducts = createAction('[Product] Load Products');

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{
    data: ProductModel;
  }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update Products Success',
  props<{
    data: ProductModel[];
  }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{
    data: ProductModel[];
  }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);
