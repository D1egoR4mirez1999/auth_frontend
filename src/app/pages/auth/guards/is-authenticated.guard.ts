import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { authState } from '../enums/auth-state.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const isAuthenticatedGuard = authService.authState() === authState.AUTHENTICATED;

  if (!isAuthenticatedGuard) {
    router.navigate(['/auth/sign-in']);
    return false;
  }

  return isAuthenticatedGuard;
};
