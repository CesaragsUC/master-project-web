import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from '../auth.guards';

@Injectable({
  providedIn: 'root',
})
export class IsAdminCanActivateGuard implements CanActivate {
  constructor(private router: Router) {}
  authGuard = inject(AuthGuard);
  canActivate(): boolean {
    const userHasPermission = this.authGuard.isAdmin;

    if (!userHasPermission) {
      this.router.navigate(['/access-denied']); // Redireciona para a página de acesso negado
      return false; // Bloqueia o acesso à rota original
    }

    return true; // Permite o acesso
  }
}
