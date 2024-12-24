import { Routes } from '@angular/router';

import { isAuthenticatedGuard } from './pages/auth/guards/is-authenticated.guard';
import { isUnauthenticatedGuard } from './pages/auth/guards/is-unauthenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then(c => c.AuthComponent),
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/components/sign-in/sign-in.component').then(c => c.SignInComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/auth/components/sign-up/sign-up.component').then(c => c.SignUpComponent),
      }
    ],
    canActivate: [isUnauthenticatedGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [isAuthenticatedGuard],
  },
  { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
];
