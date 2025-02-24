import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { ApiResponse } from "../api-response/base.response";
import { CartUpsert } from "src/app/models/basket/cart.upsert";
import { Cart } from "src/app/models/basket/cart";


@Injectable({ providedIn: 'root' })
export class CartService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    getCart(customerId: string): Observable<Cart> {
        return this.http
            .get<Cart>(this.urlService + "cart/" + customerId, super.getAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    upsertItem(cart: CartUpsert): Observable<ApiResponse> {
        return this.http
            .post(this.urlService + "cart/upsert/", cart, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    }   
}