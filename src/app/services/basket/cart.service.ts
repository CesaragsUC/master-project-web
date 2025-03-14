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
import { ResponseResult } from "../api-response/response.result";
import { DiscountRequest } from "../../models/basket/discount.request";


@Injectable({ providedIn: 'root' })
export class CartService extends BaseService {
    
    constructor(private http: HttpClient) { super() }
    public localStorage = new LocalStorageData();

    //https://tejas-variya.medium.com/level-up-your-reactivity-exploring-angular-signals-380127c7a261
    public noOfItemsInCart = signal<number>(0);

    getCart(customerId: string): Observable<ResponseResult<Cart>> {
        return this.http
            .get<ResponseResult<Cart>>(this.urlService + "cart/" + customerId, super.getAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    saveCart(cart: Cart): Observable<ApiResponse> {
        return this.http
            .post(this.urlService + "cart/save/", cart, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    }   

    deleteCart(customerId: string): Observable<ApiResponse> {
        return this.http
            .delete(this.urlService + "cart/delete?customerId=" + customerId, super.getAuthHeaderJson())
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

    applyDiscount(discountRequest: DiscountRequest): Observable<ApiResponse> {
        return this.http
            .post(this.urlService + "cart/discount/", discountRequest, super.getAuthHeaderJson())
            .pipe(
                map(super.extractApiResponse),
                catchError(super.serviceError));
    } 

    addToCart(newProduct: Product): boolean {

        try {

            this.shoppingCart = this.getCartFromLocalStorage();

            if (this.itemExistsInCart(newProduct.productId)) {
                console.log("Product already in cart !");
                return false;
            }
    
            var carItem : CartItens = {
                productName: newProduct.name,
                productId: newProduct.productId,
                quantity: 1,
                unitPrice: newProduct.price,
                imageUrl: newProduct.imageUri,
            }

            carItem.totalPrice = carItem.unitPrice * carItem.quantity;
    
            this.shoppingCart.customerId = this.localStorage.getUser().id;
            this.shoppingCart.userName = this.localStorage.getUser().name;
            this.shoppingCart.items.push(carItem);
            this.shoppingCart.totalPrice = this.shoppingCart.items.reduce((acc, item) => acc + item.totalPrice, 0);
            this.shoppingCart.subTotal = this.shoppingCart.totalPrice;
    
            this.saveCartLocalStorage(this.shoppingCart);
    
            this.saveCart(this.shoppingCart).subscribe({
                next: (sucesso: any) => { this.processarSucesso(sucesso) },
                error: (falha: any) => { this.processarFalha(falha) }
            });
    
    
            this.noOfItemsInCart.update((value:number) => this.totalItenInCart());

        } catch (error) {
            console.error('Failed to add item to cart', error);
            return false;
        }   

        return true;
    }
    
    updaCartLocalStorage(productId: string, quantity: number): boolean 
    {
        try {

            this.shoppingCart= this.getCartFromLocalStorage();

            if (!Array.isArray(this.shoppingCart.items)) {
                this.shoppingCart.items = [];
                return false;
            }
    
           // 3. Encontrar o item e atualizar a quantidade
            const itemIndex = this.shoppingCart.items.findIndex((item: any) => item.productId === productId);
    
            if (itemIndex !== -1) {
                
                this.shoppingCart.items[itemIndex].quantity = quantity;
                this.shoppingCart.items[itemIndex].totalPrice = this.shoppingCart.items[itemIndex].unitPrice * quantity;
    
                this.shoppingCart.totalPrice = this.shoppingCart.items.reduce((acc, item) => acc + (item.totalPrice ?? 0), 0);
                this.shoppingCart.subTotal = this.shoppingCart.totalPrice;

                this.saveCartLocalStorage(this.shoppingCart);
            }
            else    
            {
                return false;
            }

        }catch (error) {

            console.error('Failed to update cart', error);
            return false;
        }

        return true;
    }

    removeItemCartLocalStorage(productId: string): boolean  
    {
        try {

            this.shoppingCart = this.getCartFromLocalStorage();

            if (!this.shoppingCart || !this.shoppingCart.items)  return false; 
    
            this.shoppingCart.items = this.shoppingCart.items.filter(item => item.productId !== productId);
    
            this.shoppingCart.totalPrice = this.shoppingCart.items.reduce((acc, item) => acc + item.totalPrice, 0);
            this.shoppingCart.subTotal = this.shoppingCart.totalPrice;
            this.noOfItemsInCart.set(this.shoppingCart.items.length);

            this.saveCartLocalStorage(this.shoppingCart);

        } catch (error) {
            console.error('Failed to remove item from cart', error);
            return false;
            
        }

        return true;
    }

    adjustTotalPrice(totalprice:number, subtotal: number, discountApplied: number): void {

        try {

            this.shoppingCart = this.getCartFromLocalStorage();

            if (!this.shoppingCart || !this.shoppingCart.items)  return; 

            this.shoppingCart.totalPrice = totalprice;
            this.shoppingCart.subTotal = subtotal;
            this.shoppingCart.discountApplied = discountApplied;

            this.saveCartLocalStorage(this.shoppingCart);

        } catch (error) {
            console.error('Failed to update total price', error);

        }
    }

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

    public resetCart(): void {

        this.shoppingCart = {
                customerId: '',
                totalPrice: 0,
                items: [],
                subTotal: 0,
                userName: '',
                couponCode: ''
        };

        this.noOfItemsInCart.set(0);
        this.saveCartLocalStorage(this.shoppingCart);
    }
    
    processarSucesso(response: any) 
    {
        if (response.succeeded) 
        {
            this.shoppingCart.items = [];
            console.log('Car saved');
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