import { Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  // { path: 'login', component: LoginComponent }
  { path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./login/login.component').then(m => m.LoginComponent)
    }
  }
];
