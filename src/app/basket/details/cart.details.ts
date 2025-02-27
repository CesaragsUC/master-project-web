import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";
import { switchMap } from "rxjs";
import { ImportsModule } from "src/app/imports";
import { Cart } from "src/app/models/basket/cart";
import { RemoteItemRequest } from "src/app/models/basket/remote.item";
import { UpdateCartRequest } from "src/app/models/basket/update.cart";
import { BaseService } from "src/app/services/base.service";
import { CartService } from "src/app/services/basket/cart.service";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ImportsModule,
    NgxSpinnerComponent
  ],
  providers: [],
  selector: 'app-details',
  templateUrl: './cart.details.html',
  styleUrl: './cart.details.css'
})
export class CartDetailsComponent extends BaseService implements OnInit {


  discountForm :FormGroup;
  cartService = inject(CartService);
  spinner = inject(NgxSpinnerService);
  customerId :string;
  couponCode :string = '';
  discountApplied: number = 0;

  constructor(private fb: FormBuilder) {
    super();

    this.discountForm = this.fb.group({
      couponCode: ['']
    });
  }


   ngOnInit(): void {
      this.spinner.show();

     this.customerId = this.localStorage.getUser().id;

      this.cartService.getCart(this.customerId).subscribe({
        next: (cart) => {
          this.shoppingCart = cart.data;
        },
        error: (error) => {
          console.error("fail to load cart", error);
        }

      });

      setTimeout(() => {
          this.spinner.hide();
      }, 1000);
  }
  
  decreaseQuantity(item: any, event: Event)
  {
    event.preventDefault(); // Evita a navegação

    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart(item.productId, item.quantity);
    }
  }

  increaseQuantity(item: any, event: Event)
  {
    event.preventDefault(); // Evita a navegação
    item.quantity++;
    this.updateCart(item.productId, item.quantity);
  }

  removeItem(item: any, event: Event)
  {
    event.preventDefault(); // Evita a navegação

    this.shoppingCart.items = this.shoppingCart.items.filter((x) => x.productId !== item.productId);

    let result = this.cartService.removeItemCartLocalStorage(item.productId);

    if (!result) return;

    let updateCart : RemoteItemRequest = {
      cutomerId : this.localStorage.getUser().id,
      productId : item.productId,
    }

    this.cartService.removeItem(updateCart).subscribe({
      next: (sucesso: any) => { this.processarSucesso(sucesso) },
      error: (falha: any) => { this.processarFalha(falha) }
    });

  }

  updateCart(productId: string, quantity: number)
  {
     let result = this.cartService.updaCartLocalStorage(productId, quantity);

    if (!result) return;

     let updateCart : UpdateCartRequest = {
         customerId : this.localStorage.getUser().id,
         productId : productId,
         quantity : quantity
     }
  
     this.cartService.updateCart(updateCart).subscribe({
         next: (sucesso: any) => { this.processarSucesso(sucesso) },
         error: (falha: any) => { this.processarFalha(falha) }
     });

  }

  checkout()
  {

  }

  applyDiscount() {
    this.spinner.show();
    this.customerId = this.localStorage.getUser().id;
  
    this.cartService.getCart(this.customerId).pipe(
      switchMap(cart => {
        this.shoppingCart = cart.data;
        this.shoppingCart.couponCode = this.discountForm.get('couponCode').value;
      
        return this.cartService.applyDiscount(this.shoppingCart);
      })
    ).subscribe({
      next: (updatedCart) => {
        this.shoppingCart = updatedCart.data;
        this.discountApplied = this.shoppingCart.discountApplied;
        this.cartService.updateTotalPrice(this.shoppingCart.totalPrice);
      },
      error: (error) => {
        console.error("Failed to apply discount:", error);
      },
      complete: () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
    });
  }
  

  processarSucesso(response: any) 
  {
      if (response.succeeded) 
      {
          //this.router.navigate(['/products']);
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

  get totalPrice(): number {
    return this.localStorage.getCart().totalPrice;
 
  }
  get subTotal(): number {
    return this.localStorage.getCart().subTotal;
 
  }
  shoppingCart: Cart = {
        customerId: '',
        totalPrice: 0,
        items: [],
        subTotal: 0,
        userName: '',
        couponCode: ''
  };
}