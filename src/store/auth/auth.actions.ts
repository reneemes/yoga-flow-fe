import { createAction, props } from '@ngrx/store';

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
// An action you dispatch after a successful login, and it carries the JWT token as data
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);
// is a simple action indicating the user logged out — no extra data needed
export const logout = createAction(
  '[Auth] Logout'
);
// These actions don’t do anything by themselves — they just describe events
// You dispatch them, and something else (like a reducer) handles them