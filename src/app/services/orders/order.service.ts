import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { Order } from "src/app/models/order/order";
import { ResponseResult } from "../api-response/response.result";


@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    getAll(): Observable<ResponseResult<Order[]>> {

     return this.http
              .get<ResponseResult<Order[]>>("orders/all", super.getAuthHeaderJson())
              .pipe(catchError(super.serviceError));
    }

    getOrder(id: string): Observable<ResponseResult<Order[]>> {

        return this.http
        .get<ResponseResult<Order[]>>(this.urlService + "orders/"+ id, super.getAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }   
}