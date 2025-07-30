import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const tokenKey = 'auth';
// Select the entire "auth" state
export const selectAuthState = createFeatureSelector<AuthState>(tokenKey);

// Used to query the store and retrieve the auth token
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

// Check if the user is authenticated
// Returns true if a token exists, otherwise false
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => !!state.token
);

// Used in the component like this:
// this.store.select(selectToken).subscribe(token => console.log(token));
// Read only