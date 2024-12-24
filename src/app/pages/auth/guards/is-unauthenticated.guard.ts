import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { authState } from '../enums/auth-state.enum';

import { AuthService } from '../services/auth.service';

export const isUnauthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const isUnauthenticatedUser = authService.authState() === authState.UNAUTHENTICATED;

  if (!isUnauthenticatedUser) {
    return false;
  }

  return isUnauthenticatedUser;
};
