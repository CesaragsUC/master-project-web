import { inject, Injectable } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { JwtService } from 'src/app/services/account/jwt.services';
//demo de guard rotas : https://stackblitz.com/edit/angular-1jzwbn?file=src%2Frouting.ts

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  authService = inject(AccountService);
  jwtService = inject(JwtService);

  user = { admin: true, logged: false, manager: true };

  userLoged =  this.authService.localStorage.getLoggedUser();

  get isAdmin() {
    const claims = this.jwtService.getClaims(this.authService.localStorage.getUserToken());
    if (claims) {
      const roles = this.processRoles(claims);
      const exists = roles.some(role => role.toLowerCase() === 'admin');
      if (exists) {
        this.userLoged.isAdmin = true;
      }
      return this.userLoged.isAdmin;
    }
    return this.userLoged.isAdmin;
  }

  get isManager() {
    return this.user.manager;
  }

  get isLogged() {
    const claims = this.jwtService.getClaims(this.authService.localStorage.getUserToken());
    if (claims) {
       this.userLoged.isLogged = true;
    }
    return this.userLoged.isLogged;
  }

  processRoles(roles: any[]): string[] {
    const extractedRoles: string[] = [];
  
    roles.forEach(role => {
      try {
        // Verifica se o valor é um JSON
        const parsedRole = JSON.parse(role);
  
        // Caso seja JSON, extrai as roles
        if (parsedRole.roles) {
          extractedRoles.push(...parsedRole.roles);
        }
      } catch {
        // Caso não seja JSON, adiciona diretamente
        extractedRoles.push(role);
      }
    });
  
    return extractedRoles;
  }

  processClaims(claims: any[]): string[] {
    const extracteClaims: string[] = [];
  
    claims.forEach(claim => {
      try {
        // Verifica se o valor é um JSON
        const parsedClaim = JSON.parse(claim);
  
        // Caso seja JSON, extrai as claims
        if (parsedClaim.claims) {
            extracteClaims.push(...parsedClaim.claims);
        }
      } catch {
        // Caso não seja JSON, adiciona diretamente
        extracteClaims.push(claim);
      }
    });
  
    return extracteClaims;
  }

}

export function isLogged() {
    const isLogged = inject(AuthGuard).isLogged;
    console.log('isLogged', isLogged);
    return isLogged;
}


export function isAdminCanMatchGuard() {
    const isAdmin = inject(AuthGuard).isAdmin;
    console.log('isAdminCanMatchGuard', isAdmin);
    return isAdmin;
}

export function isManagerCanMatchGuard() {
    const isManager = inject(AuthGuard).isManager;
    console.log('isManagerCanMatchGuard', isManager);
    return isManager;
  }
  
  