export class LocalStorageData {
    
    public getUser() {
        const user = localStorage.getItem('casoft.user');
        return user ? JSON.parse(user) : null;
    }

    public saveLocalUserData(response: any) {
        this.saveUserToken(response.access_token);
        this.saveUserRefreshToken(response.refresh_token);
        this.saveUser(response.user);
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
    public saveUser(user: string) {
        localStorage.setItem('casoft.user', JSON.stringify(user));
    }

}