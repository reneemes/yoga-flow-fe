import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PosesComponent } from './components/poses/poses.component';
// import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  // { path: 'login', component: LoginComponent }
  { path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./login/login.component').then(m => m.LoginComponent)
    }
  },
  { path: 'home', component: HomeComponent},
  { path: 'poses', component: PosesComponent}
];
