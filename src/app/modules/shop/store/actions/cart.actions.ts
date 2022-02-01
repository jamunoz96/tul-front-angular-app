import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/core/models/product.model';

export const prepareToAddCart = createAction(
  '[Cart] PrepareToAdd Cart', props<{ data: ProductModel; }>()
);

export const updateProductCart = createAction(
  '[Cart] UpdateProduct Cart', props<{ data: ProductModel; }>()
);

export const addToCart = createAction(
  '[Cart] Add Cart', props<{ data: ProductModel; }>()
);

export const refreshCart = createAction(
  '[Cart] Refresh Cart', props<{ data: ProductModel[]; }>()
);

export const removeToCart = createAction(
  '[Cart] Remove Cart', props<{ id: string; }>()
);

export const createOrder = createAction(
  '[Cart] CreateOrder Cart'
);

export const createOrderSuccess = createAction(
  '[Cart] CreateOrder Success'
);

export const createOrderFailure = createAction(
  '[Cart] CreateOrder Failure',
  props<{ error: string }>()
);

export const loadOrders = createAction(
  '[Cart] LoadOrdersAction Cart'
);

export const anyAction = createAction(
  '[Cart] AnyAction Cart'
);