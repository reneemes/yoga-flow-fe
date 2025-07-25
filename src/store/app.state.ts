import { AuthState } from './auth/auth.reducer';

export interface AppState {
  auth: AuthState;
}
// The default state when the app starts -- no token
export const initialState: AuthState = {
  token: null
};