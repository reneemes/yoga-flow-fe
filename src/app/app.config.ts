import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

import { provideState } from '@ngrx/store';
import { tokenKey } from './state/auth/auth.selectors';
import { authReducer } from './state/auth/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideHttpClient(),
    provideStore(), // initializes the global store
    provideState(tokenKey, authReducer), // feature state for auth
  ]
};
