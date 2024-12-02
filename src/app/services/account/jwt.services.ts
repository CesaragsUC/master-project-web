import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  // Método para decodificar o token
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }

  // Método para verificar se o token está expirado
  isTokenExpired(token: string): boolean {
    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);

    return expirationDate < new Date(); // Retorna true se o token está expirado
  }

  // Método para extrair informações específicas do token
  getUserName(token: string): string | null {
    const decodedToken: any = this.decodeToken(token);
    return decodedToken ? decodedToken.preferred_username : null;
  }

  getRoles(token: string): string[] {
    const decodedToken: any = this.decodeToken(token);
    return decodedToken?.realm_access?.roles || [];
  }

  getClaims(token: string): string[] {
    const decodedToken: any = this.decodeToken(token);
    return decodedToken?.resource_access?.casoftsystem?.roles || [];
  }

}


