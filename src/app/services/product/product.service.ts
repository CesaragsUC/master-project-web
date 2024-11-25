import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { Product } from "../../models/product/product";
import { catchError, map, Observable } from "rxjs";

@Injectable()
export class ProdutoService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    getAll(): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.urlService + "catalog", super.getAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    getById(id: string): Observable<Product> {
        return this.http
            .get<Product>(this.urlService + "catalog/" + id, super.getAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    addProduct(produto: Product): Observable<Product> {
        return this.http
            .post(this.urlService + "product", produto, super.getAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    updateProduct(produto: Product): Observable<Product> {
        return this.http
            .put(this.urlService + "product/" + produto.id, produto, super.getAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    deleteProduct(id: string): Observable<Product> {
        return this.http
            .delete(this.urlService + "product/" + id, super.getAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }    
}