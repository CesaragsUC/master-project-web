import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from '../details/cart.details';
import { CheckoutComponent } from '../checkout/checkout.component';

const cartRouting: Routes = [

    { path: '', component: CartDetailsComponent },
    { path: 'details', component: CartDetailsComponent },
    { path: 'itemcount', component: CheckoutComponent }

];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(cartRouting)
    ],
 })
export class CartModule { }