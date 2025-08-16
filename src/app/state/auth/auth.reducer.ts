import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  name: string | null;
}

export const initialState: AuthState = {
  token: null,
  name: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { token, name }) => ({ ...state, token, name})),
  on(AuthActions.logout, (state) => ({...state, token: null, name: null}))
);
