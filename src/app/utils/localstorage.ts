import { LoginResponse, UserToken } from "../models/login/login.response";

export class LocalStorageData {
    
    public getUser() {
        const user = localStorage.getItem('casoft.user');
        return user ? JSON.parse(user) : null;
    }

    public getLoggedUser() : LoginResponse {
        const user = localStorage.getItem('casoft.user');
        return user ? JSON.parse(user) : null;
    }

    public saveLocalUserData(response: LoginResponse) {
        this.saveUserToken(response.accessToken);
        this.saveUserRefreshToken(response.refreshToken);
        this.saveUser(response.userToken);
    }

    public clearLocaluserData() {
        localStorage.removeItem('casoft.access_token');
        localStorage.removeItem('casoft.refresh_token');
        localStorage.removeItem('casoft.user');
    }

    public getUserToken(): string | null {
        return localStorage.getItem('casoft.access_token');
    }

    public saveUserToken(token: string) {
        localStorage.setItem('casoft.access_token', token);
    }

    public getUserRefreshToken(): string | null {
        return localStorage.getItem('casoft.refresh_token');
    }

    public saveUserRefreshToken(refresToken: string) {
        localStorage.setItem('casoft.refresh_token', refresToken);
    }
    public saveUser(user: UserToken) {
        localStorage.setItem('casoft.user', JSON.stringify(user));
    }

}