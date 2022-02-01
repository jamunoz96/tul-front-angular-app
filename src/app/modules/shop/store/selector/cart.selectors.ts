import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartFeatureKey, CartState } from '../reducer/cart.reducer';

const cartFeatureSelector = createFeatureSelector<CartState>(cartFeatureKey);

export const getCart = createSelector(
  cartFeatureSelector,
  (state: CartState) => state.products
);