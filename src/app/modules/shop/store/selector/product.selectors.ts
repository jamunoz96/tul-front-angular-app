import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productFeatureKey, ProductState } from '../reducer/product.reducer';

const productFeatureSelector = createFeatureSelector<ProductState>(productFeatureKey);

export const getProducts = createSelector(
  productFeatureSelector,
  (state: ProductState) => state.products
);
export const getProductLoading = createSelector(
  productFeatureSelector,
  (state: ProductState) => state.loading
);
export const getProductError = createSelector(
  productFeatureSelector,
  (state: ProductState) => state.error
);
