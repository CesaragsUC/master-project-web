import { inject, Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth.guards';

@Injectable({
  providedIn: 'root',
})
export class IsAdminCanLoadGuard implements CanLoad {
  constructor(private router: Router) {}
  authGuard = inject(AuthGuard);
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    const isAdmin = this.authGuard.isAdmin;

    if (!isAdmin) {
      this.router.navigate(['/access-denied']); // Redireciona se não for admin
      return false; // Bloqueia o carregamento do módulo
    }

    return true; // Permite o carregamento do módulo
  }

}
