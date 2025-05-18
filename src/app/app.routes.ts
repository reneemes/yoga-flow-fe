import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PosesComponent } from './components/poses/poses.component';
import { PoseDetailsComponent } from './components/pose-details/pose-details.component';
// import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  // { path: 'login', component: LoginComponent }
  { path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./login/login.component').then(m => m.LoginComponent)
    }
  },
  // { path: '',
  //   pathMatch: 'full',
  //   loadComponent: () => {
  //     return import('./components/home/home.component').then(m => m.HomeComponent)
  //   }
  // },
  { path: 'home', component: HomeComponent},
  { path: 'poses', component: PosesComponent},
  { path: 'poses/:id', component: PoseDetailsComponent}
];
