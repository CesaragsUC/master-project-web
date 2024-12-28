import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { Product } from "../../models/product/product";
import { catchError, map, Observable } from "rxjs";
import { ProductAdd } from "src/app/models/product/product.create";
import { ApiResponse } from "../api-response/base.response";
import { ResponseResult } from "../api-response/response.result";
import { ProductFilter } from "src/app/dtos/product.filter";
import { environment } from "src/environments/environment";


@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    getAll(filter?: ProductFilter): Observable<ResponseResult<Product[]>> {
        const query = filter ? `?${this.toQueryString(filter)}` : '';
        const url = `${environment.apiUrl}catalog/all${query}`;
      
        return this.http
          .get<ResponseResult<Product[]>>(url, super.getAuthHeaderJson())
          .pipe(catchError(super.serviceError));
    }
      
    toQueryString(filter: ProductFilter): string {
        const parts: string[] = [];
        for (const property in filter) {
          const value = filter[property];
          if (value !== null && value !== undefined) {
            parts.push(`${encodeURIComponent(property)}=${encodeURIComponent(value)}`);
          }
        }
        return parts.join('&');
    }

    getById(id: string): Observable<Product> {
        return this.http
            .get<Product>(this.urlService + "catalog/product/" + id, super.getAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    addProduct(produto: ProductAdd): Observable<ApiResponse> {
        return this.http
            .post(this.urlService + "product/add", produto, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    }

    updateProduct(produto: Product): Observable<ApiResponse> {
        return this.http
            .put(this.urlService + "product/update", produto, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    }

    deleteProduct(id: string): Observable<ApiResponse> {
        return this.http
            .delete(this.urlService + "product/delete?id=" + id, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    }    
}