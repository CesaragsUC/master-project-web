import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Product } from "src/app/models/product/product";
import { ProductService } from "src/app/services/product/product.service";

@Injectable({ providedIn: 'root' })
export class ProductResolve implements Resolve<Product> {

    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.productService.getById(route.params['id']);
    }
}