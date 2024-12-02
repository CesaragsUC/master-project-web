import { inject, Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth.guards';

@Injectable({
  providedIn: 'root',
})
export class IsAdminCanActivateChildGuard implements CanActivateChild {
  constructor(private router: Router) {}
  authGuard = inject(AuthGuard);
  canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
    const isAdmin = this.authGuard.isAdmin;

    if (!isAdmin) {
      this.router.navigate(['/access-denied']); // Redireciona se não for admin
      return false; // Bloqueia o acesso
    }

    return true; // Permite o acesso
  }

}
