import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";
import { ImportsModule } from "src/app/imports";
import { Cart } from "src/app/models/basket/cart";
import { BaseService } from "src/app/services/base.service";
import { CartService } from "src/app/services/basket/cart.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css',
    standalone:true,
    imports: [
        CommonModule,
        RouterModule,
        ImportsModule,
        NgxSpinnerComponent
      ],
  })
  export class CheckoutComponent extends BaseService implements OnInit {

       cartService = inject(CartService);
       spinner = inject(NgxSpinnerService);
       customerId :string;
       subtotal: number = 0;

      shoppingCart: Cart = {
            customerId: '',
            totalPrice: 0,
            items: [],
            subTotal: 0,
            userName: '',
            couponCode: ''
      };

      constructor() {
        super();

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

  }