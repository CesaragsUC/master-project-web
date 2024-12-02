export interface LoginResponse {
    accessToken?: string;
    email?: string;
    expiresIn?: number;
    isAdmin?: boolean;
    name?: string;
    refreshToken?: string;
    userToken?: UserToken;
    isLogged?: boolean;
    department?: Department;
  }
  
  export interface UserToken {
    claims?: Claim[];
    email?: string;
    groups?: Group[];
    roles?: string[];
  }
  
  export interface Claim {
    type?: string;
    value?: string | number;
  }
  
  export interface Group {
    id?: string;
    name?: string;
  }
  

  export enum Department {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    DIRECTOR = 'DIRECTOR',
    FINANCIAL = 'FINANCIAL',
    RH = 'RH',
    SALES = 'SALES',
    JURIDIC = 'JURIDIC',
    USER = 'USER',
    CUSTOMER = 'CUSTOMER',
    EMPLOYEE = 'EMPLOYEE'
  }