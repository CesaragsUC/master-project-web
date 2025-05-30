import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from '../details/cart.details';
import { CheckoutComponent } from '../checkout/checkout.component';
import { FormsModule } from '@angular/forms';

const cartRouting: Routes = [

    { path: '', component: CartDetailsComponent },
    { path: 'details', component: CartDetailsComponent },
    { path: 'checkout', component: CheckoutComponent }

];
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(cartRouting)
    ],
 })
export class CartModule { }