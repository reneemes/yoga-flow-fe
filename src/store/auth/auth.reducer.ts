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

export const initialState: AuthState = {
  token: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null
  }))
);
