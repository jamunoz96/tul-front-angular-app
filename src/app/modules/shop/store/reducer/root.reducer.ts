import { ActionReducerMap } from '@ngrx/store';
import { cartReducer, CartState } from './cart.reducer';
import { productsReducer, ProductState } from './product.reducer';

export interface AppState {
    products: ProductState;
    cart: CartState;
}

export const rootReducer: ActionReducerMap<AppState> = {
    products: productsReducer,
    cart: cartReducer,
};
