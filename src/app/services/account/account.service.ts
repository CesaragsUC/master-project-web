import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user/usuario";
import { catchError, map, Observable } from "rxjs";
import { LoginRequest } from "src/app/models/login/user.login";
import { LoginResponse } from "src/app/models/login/login.response";

@Injectable({providedIn: 'root'})
export class AccountService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    registerUser(usuario: User):Observable<User> {
        let response = this.http.post(this.urlService + 'auth/register', usuario,this.getHeaderJson())
        .pipe(map(this.extractData), catchError(this.serviceError));

        return response;
    }

    login(usuario: LoginRequest): Observable<LoginResponse> {
        let response = this.http
            .post(this.urlService + 'auth/login', usuario, this.getHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }
}