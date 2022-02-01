import { Action, createReducer, on } from '@ngrx/store';
import { ProductModel } from '@tul/core/models/product.model';

import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  updateProductSuccess
} from '../actions/products.actions';

export const productFeatureKey = 'products';

export interface ProductState {
  products: ProductModel[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productsReducer = createReducer<ProductState, Action>(
  initialState,
  on(loadProducts, (state) => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state, action) => ({
    ...state,
    loading: false,
    products: action.data,
  })),
  on(loadProductsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(updateProductSuccess, (state, action) => ({
    ...state,
    products: action.data,
  })),
);
