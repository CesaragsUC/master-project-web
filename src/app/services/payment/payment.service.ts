import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { ApiResponse } from "../api-response/base.response";
import { Cart } from "src/app/models/basket/cart";
import { Payment } from "src/app/models/billing/payment";
import { ResponseResult } from "../api-response/response.result";


@Injectable({ providedIn: 'root' })
export class PaymentService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    getAll(): Observable<ResponseResult<Payment[]>> {
        return this.http
        .get<ResponseResult<Payment[]>>(this.urlService + "billing/payments", super.getAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }

    getPayments(transactionId: string): Observable<ResponseResult<Payment>> {
        return this.http
            .get<ResponseResult<Payment>>(this.urlService + "billing/payment/" + transactionId, super.getAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    sendPayment(cart: Cart): Observable<ApiResponse> {
        return this.http
            .post(this.urlService + "billing/process/", cart, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    }   
}