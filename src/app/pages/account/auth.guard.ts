import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CampusSession } from './campus-session';

export const authGuard: CanActivateFn = async (_route, state) => {
  const session = inject(CampusSession);
  const router = inject(Router);
  await session.restore();
  return !!session.user() || router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
};
