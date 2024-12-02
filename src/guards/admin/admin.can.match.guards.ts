import { inject, Injectable } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth.guards';

@Injectable({
  providedIn: 'root',
})
export class AdminCanMatchGuard implements CanMatch {
  constructor(private router: Router) {}

  authGuard = inject(AuthGuard);

  canMatch(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userHasPermission = this.authGuard.isAdmin;
    if (!userHasPermission) {
      return this.router.parseUrl('/access-denied'); // Redireciona
    }

    return true; // Permite o acesso
  }
}
