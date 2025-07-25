import { createReducer, on } from '@ngrx/store';
// import { AuthActions } from './auth.actions';
import * as AuthActions from './auth.actions';

interface User {
  email: string;
  password: string
}
interface SessionResponse {
  token: string;
  user: {
    data: {
      id: number;
      type: string;
      attributes: {
        name: string;
        email: string
      }
    }
  }
}
export interface AuthState {
  token: string | null;
}
// The default state when the app starts -- no token
export const initialState: AuthState = {
  token: null
};
// Builds a reducer function by handling specific actions
export const authReducer = createReducer(
  initialState,
  // Takes the current state and token
  // Returns a new state object with the token stored
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token
  })),
  // Clears the token by setting it back to null
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null
  }))
);
