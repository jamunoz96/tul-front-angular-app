import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../reducer/auth.reducer';

const authFeatureSelector = createFeatureSelector<AuthState>(authFeatureKey);

export const getAuthUser = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.user
);
export const getAuthLoading = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.loading
);
export const getAuthError = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.error
);
