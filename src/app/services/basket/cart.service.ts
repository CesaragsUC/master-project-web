import { Injectable, signal } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { ApiResponse } from "../api-response/base.response";
import { Cart, CartItens } from "src/app/models/basket/cart";
import { Product } from "src/app/models/product/product";
import { LocalStorageData } from "src/app/utils/localstorage";
import { RemoteItemRequest } from "src/app/models/basket/remote.item";
import { UpdateCartRequest } from "src/app/models/basket/update.cart";


@Injectable({ providedIn: 'root' })
export class CartService extends BaseService {
    
    constructor(private http: HttpClient) { super() }
    public localStorage = new LocalStorageData();

    //https://tejas-variya.medium.com/level-up-your-reactivity-exploring-angular-signals-380127c7a261
    public noOfItemsInCart = signal<number>(0);

    getCart(customerId: string): Observable<Cart> {
        return this.http
            .get<Cart>(this.urlService + "cart/" + customerId, super.getAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    saveCart(cart: Cart): Observable<ApiResponse> {
        return this.http
            .post(this.urlService + "cart/save/", cart, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    }   

    updateCart(cart: UpdateCartRequest): Observable<ApiResponse> {
        return this.http
            .put(this.urlService + "cart/update/", cart, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    }  

    removeItem(item: RemoteItemRequest): Observable<ApiResponse> {
        return this.http
            .delete(this.urlService + "cart/remove-item/" + item.cutomerId + "/"+ item.productId, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    }  

    checkout(cart: Cart): Observable<ApiResponse> {
        return this.http
            .post(this.urlService + "cart/checkout/", cart, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    }  

    applyDiscount(cart: Cart): Observable<ApiResponse> {
        return this.http
            .post(this.urlService + "cart/discount/", cart, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    } 

    addToCart(newProduct: Product): void {

        this.shoppingCart = this.getCartFromLocalStorage();

        if (this.itemExistsInCart(newProduct.productId)) {
            console.log("Este produto já está no carrinho!");
            return;
        }

        var carItem : CartItens = {
            productName: newProduct.name,
            productId: newProduct.productId,
            quantity: 1,
            unitPrice: newProduct.price,
            imageUrl: newProduct.imageUri,
        }

        this.shoppingCart.customerId = this.localStorage.getUser().id;
        this.shoppingCart.userName = this.localStorage.getUser().name;
        this.shoppingCart.items.push(carItem);
        this.shoppingCart.totalPrice = this.shoppingCart.items.reduce((acc, item) => acc + item.totalPrice, 0);

        this.saveCartLocalStorage(this.shoppingCart);

        this.saveCart(this.shoppingCart).subscribe({
            next: (sucesso: any) => { this.processarSucesso(sucesso) },
            error: (falha: any) => { this.processarFalha(falha) }
        });


        this.noOfItemsInCart.update((value:number) => this.totalItenInCart());

        console.log("Produto adicionado ao carrinho!");
    }
    
    // public addToCart(product: Product):void {

    //     if(this.itemAlreadyAdd(product)) return;

    //     //save cairt iten localStorage;    
    //     this.saveItemLocalStorage(product);

    //     var carItem : CartItens = {
    //         productName: product.name,
    //         productId: product.productId,
    //         quantity: 1,
    //         unitPrice: product.price,
    //     }
            
    //     this.cart.items.push(carItem);


    //      this.cart.customerId = this.localStorage.getUser().id;
    //      this.cart.userName = this.localStorage.getUser().name;
    //      this.cart.subTotal = (this.cart.items ?? []).reduce((acc, item) => acc + (item.totalPrice ?? 0), 0);

    //     this.saveCart(this.cart).subscribe({
    //         next: (sucesso: any) => { this.processarSucesso(sucesso) },
    //         error: (falha: any) => { this.processarFalha(falha) }
    //     });


    //     this.noOfItemsInCart.update((value:number) => this.totalItenInCart()); 
    // }
    
    itemExistsInCart(productId: string): boolean {

        const cart = this.getCartFromLocalStorage();

        if (!cart.items) return false;

        return cart.items.some(item => item.productId === productId);
    }
    
    saveCartLocalStorage(cart: Cart): void {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    getCartFromLocalStorage(): Cart {
        return JSON.parse(localStorage.getItem('cart') || '{"items": [], "totalPrice": 0}');
    }

    public totalItenInCart(): number {
        const cart = this.getCartFromLocalStorage();
        return cart.items.length;
    }
    
    processarSucesso(response: any) 
    {
        if (response.succeeded) 
        {
            this.shoppingCart.items = [];
            console.log('Item added to cart');
        };
    }
  
    processarFalha(fail: any) {
  
      const errorMessages = fail.error?.messages;
  
       const detailMessage = Array.isArray(errorMessages) 
       ? errorMessages.map((msg: string) => `- ${msg}`).join('\n') 
       : 'An unexpected error occurred.';

       console.error('Failed to add item to cart', detailMessage);
    }

    private shoppingCart: Cart = {
        customerId: '',
        totalPrice: 0,
        items: [],
        subTotal: 0,
        userName: '',
        couponCode: ''
    };
    
}