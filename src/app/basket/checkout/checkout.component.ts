import { Component, inject } from "@angular/core";
import { CartService } from "src/app/services/basket/cart.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css',
    standalone:true,
  })
  export class CheckoutComponent{
    private cartService = inject(CartService);


  }