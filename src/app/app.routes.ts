import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'auth',
		loadComponent: () => import('./pages/auth/auth.component').then(c => c.AuthComponent),
	},
	{
		path: 'dashboard',
		loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
	},
	{ path: '',   redirectTo: '/auth', pathMatch: 'full' },
];
