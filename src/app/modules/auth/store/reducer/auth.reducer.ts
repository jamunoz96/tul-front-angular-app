import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';
import {
  loadCheckAuths,
  loadCheckAuthsFailure,
  loadCheckAuthsSuccess,
  loadSignInWithEmail,
  loadSignInWithEmailFailure,
  loadSignInWithEmailSuccess,
  loadRegisterWithEmail,
  loadRegisterWithEmailFailure,
  loadRegisterWithEmailSuccess,
  loadSignouts,
  loadSignoutsFailure,
  loadSignoutsSuccess,
} from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: UserModel | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const reducer = createReducer<AuthState, Action>(
  initialState,
  on(loadCheckAuths, (state) => ({ ...state, loading: true })),
  on(loadCheckAuthsSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.data.user,
  })),
  on(loadCheckAuthsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(loadSignInWithEmail, (state) => ({ ...state, loading: true })),
  on(loadSignInWithEmailSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.data.user,
  })),
  on(loadSignInWithEmailFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(loadRegisterWithEmail, (state) => ({ ...state, loading: true })),
  on(loadRegisterWithEmailSuccess, (state) => ({ ...state, loading: false })),
  on(loadRegisterWithEmailFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(loadSignouts, (state) => ({ ...state, loading: true })),
  on(loadSignoutsSuccess, (state) => ({ ...state, loading: false })),
  on(loadSignoutsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);
