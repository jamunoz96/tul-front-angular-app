import { Action, createReducer, on } from '@ngrx/store';
import { ProductModel } from '@tul/core/models/product.model';

import {
  addToCart,
  createOrder,
  createOrderFailure,
  createOrderSuccess,
  refreshCart,
  removeToCart,
} from '../actions/cart.actions';

export const cartFeatureKey = 'cart';

export interface CartState {
  loading: boolean;
  error: string | null;
  products: ProductModel[];
}

const initialState: CartState = {
  loading: false,
  error: null,
  products: [],
};

export const cartReducer = createReducer<CartState, Action>(
  initialState,
  on(createOrder, (state, action) => ({
    ...state,
    loading: true,
  })),
  on((createOrderSuccess), (state, action) => ({
    ...state,
    loading: false,
    products: []
  })),
  on((createOrderFailure), (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(addToCart, (state, action) => ({
    ...state,
    products: [...state.products, action.data],
  })),
  on(refreshCart, (state, action) => ({
    ...state,
    products: action.data
  })),
  on(removeToCart, (state, action) => ({
    ...state,
    products: state.products.filter(p => p.id !== action.id),
  })),
);
