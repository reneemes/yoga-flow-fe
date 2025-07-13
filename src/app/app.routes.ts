import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PosesComponent } from './components/poses/poses.component';
import { PoseDetailsComponent } from './components/pose-details/pose-details.component';
import { RoutinesComponent } from './components/routines/routines.component';
import { RoutineDetailsComponent } from './components/routine-details/routine-details.component';

export const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./login/login.component').then(m => m.LoginComponent)
    }
  },
  // { path: 'home', component: HomeComponent},
  // { path: 'poses', component: PosesComponent},
  // { path: 'poses/:id', component: PoseDetailsComponent},
  // { path: 'routines', component: RoutinesComponent},
  // { path: 'routines/:id', component: RoutineDetailsComponent}
  { path: 'home',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/home/home.component').then(m => m.HomeComponent)
    }
  },
  { path: 'poses',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/poses/poses.component').then(m => m.PosesComponent)
    }
  },
  { path: 'poses/:id',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/pose-details/pose-details.component').then(m => m.PoseDetailsComponent)
    }
  },
  { path: 'routines',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/routines/routines.component').then(m => m.RoutinesComponent)
    }
  },
  { path: 'routines/:id',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/routine-details/routine-details.component').then(m => m.RoutineDetailsComponent)
    }
  }
];
