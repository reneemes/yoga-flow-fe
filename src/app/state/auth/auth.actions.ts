import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ token: string, name: string }>()
);

export const logout = createAction(
  '[Auth] Logout'
);
