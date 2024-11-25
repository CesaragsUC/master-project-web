export class LocalStorageData {
    
    public obterUsuario() {
        const user = localStorage.getItem('casoft.user');
        return user ? JSON.parse(user) : null;
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('casoft.token');
        localStorage.removeItem('casoft.user');
    }

    public obterTokenUsuario(): string | null {
        return localStorage.getItem('casoft.token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('casoft.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('casoft.user', JSON.stringify(user));
    }

}