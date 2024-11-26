import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user/usuario";
import { catchError, map, Observable } from "rxjs";
import { UserLogin } from "src/app/models/user/user.login";

@Injectable()
export class AccountService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    registerUser(usuario: User):Observable<User> {
        let response = this.http.post(this.urlService + 'auth/register', usuario,this.getHeaderJson())
        .pipe(map(this.extractData), catchError(this.serviceError));

        return response;
    }

    login(usuario: UserLogin): Observable<User> {
        let response = this.http
            .post(this.urlService + 'auth/login', usuario, this.getHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }
}