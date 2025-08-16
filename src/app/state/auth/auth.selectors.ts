import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const tokenKey = 'auth';
export const selectAuthState = createFeatureSelector<AuthState>(tokenKey);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectName = createSelector(
  selectAuthState,
  (state: AuthState) => state.name
)

// Used in the component like this:
// this.store.select(selectToken).subscribe(token => console.log(token));
// Read only